-- Function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate share token
CREATE OR REPLACE FUNCTION public.generate_share_token()
RETURNS TEXT AS $$
BEGIN
    RETURN encode(gen_random_bytes(32), 'base64url');
END;
$$ LANGUAGE plpgsql;

-- Function to get project by share token
CREATE OR REPLACE FUNCTION public.get_shared_project(token TEXT)
RETURNS TABLE (
    project_id UUID,
    title TEXT,
    description TEXT,
    html_content TEXT,
    css_content TEXT,
    js_content TEXT,
    preview_data JSONB
) AS $$
BEGIN
    -- Update view count
    UPDATE public.project_shares 
    SET view_count = view_count + 1 
    WHERE share_token = token;
    
    -- Return project data
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.description,
        p.html_content,
        p.css_content,
        p.js_content,
        p.preview_data
    FROM public.projects p
    JOIN public.project_shares ps ON p.id = ps.project_id
    WHERE ps.share_token = token 
    AND (ps.expires_at IS NULL OR ps.expires_at > NOW())
    AND ps.is_public = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

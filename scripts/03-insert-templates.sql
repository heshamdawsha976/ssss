-- Insert default templates
INSERT INTO public.templates (name, description, category, html_template, css_template, config) VALUES
(
    'Restaurant Template',
    'Professional restaurant landing page with menu and reservations',
    'restaurant',
    '<!DOCTYPE html>
<html lang="{{language}}" dir="{{direction}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans">
    <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-red-600">{{title}}</h1>
            <div class="space-x-6">
                <a href="#menu" class="hover:text-red-600">Menu</a>
                <a href="#about" class="hover:text-red-600">About</a>
                <a href="#contact" class="hover:text-red-600">Contact</a>
            </div>
        </nav>
    </header>
    
    <section class="bg-red-600 text-white py-20 text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-bold mb-6">{{title}}</h1>
            <p class="text-xl mb-8">{{subtitle}}</p>
            <button class="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Make Reservation
            </button>
        </div>
    </section>
    
    <section id="menu" class="py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Our Menu</h2>
            <div class="grid md:grid-cols-3 gap-8">
                {{#each features}}
                <div class="text-center p-6 border rounded-lg">
                    <h3 class="text-xl font-semibold mb-2">{{this}}</h3>
                    <p class="text-gray-600">Delicious and fresh ingredients</p>
                    <p class="text-red-600 font-bold mt-2">$25</p>
                </div>
                {{/each}}
            </div>
        </div>
    </section>
</body>
</html>',
    '.hero { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); }',
    '{"primaryColor": "#dc2626", "secondaryColor": "#991b1b", "sections": ["hero", "menu", "about", "contact"]}'
),
(
    'Tech App Template',
    'Modern tech application landing page with features showcase',
    'tech',
    '<!DOCTYPE html>
<html lang="{{language}}" dir="{{direction}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans">
    <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-purple-600">{{title}}</h1>
            <div class="space-x-6">
                <a href="#features" class="hover:text-purple-600">Features</a>
                <a href="#download" class="hover:text-purple-600">Download</a>
                <a href="#support" class="hover:text-purple-600">Support</a>
            </div>
        </nav>
    </header>
    
    <section class="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-bold mb-6">{{title}}</h1>
            <p class="text-xl mb-8">{{subtitle}}</p>
            <button class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Download Now
            </button>
        </div>
    </section>
    
    <section id="features" class="py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
            <div class="grid md:grid-cols-3 gap-8">
                {{#each features}}
                <div class="text-center p-6 border rounded-lg">
                    <div class="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">{{this}}</h3>
                    <p class="text-gray-600">Advanced technology for better experience</p>
                </div>
                {{/each}}
            </div>
        </div>
    </section>
</body>
</html>',
    '.hero { background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); }',
    '{"primaryColor": "#7c3aed", "secondaryColor": "#2563eb", "sections": ["hero", "features", "download", "support"]}'
),
(
    'E-commerce Template',
    'Professional online store landing page with product showcase',
    'ecommerce',
    '<!DOCTYPE html>
<html lang="{{language}}" dir="{{direction}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans">
    <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-green-600">{{title}}</h1>
            <div class="space-x-6">
                <a href="#products" class="hover:text-green-600">Products</a>
                <a href="#categories" class="hover:text-green-600">Categories</a>
                <a href="#contact" class="hover:text-green-600">Contact</a>
            </div>
        </nav>
    </header>
    
    <section class="bg-green-600 text-white py-20 text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-bold mb-6">{{title}}</h1>
            <p class="text-xl mb-8">{{subtitle}}</p>
            <button class="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Shop Now
            </button>
        </div>
    </section>
    
    <section id="products" class="py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div class="grid md:grid-cols-3 gap-8">
                {{#each features}}
                <div class="border rounded-lg overflow-hidden">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">{{this}}</h3>
                        <p class="text-gray-600 mb-4">High quality product description</p>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-bold text-green-600">$99</span>
                            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
    </section>
</body>
</html>',
    '.hero { background: linear-gradient(135deg, #059669 0%, #047857 100%); }',
    '{"primaryColor": "#059669", "secondaryColor": "#047857", "sections": ["hero", "products", "categories", "cart"]}'
);

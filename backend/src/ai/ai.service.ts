import { Injectable } from "@nestjs/common"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface PreviewData {
  title: string
  subtitle: string
  primaryColor: string
  sections: string[]
  features: string[]
  template: string
}

@Injectable()
export class AiService {
  private responses = {
    ar: {
      greeting: [
        "مرحباً! أنا مساعدك الذكي لإنشاء صفحات الهبوط. أخبرني عن مشروعك وسأساعدك في بناء صفحة مثالية.",
        "أهلاً بك! دعني أساعدك في إنشاء صفحة هبوط احترافية. ما نوع العمل أو الخدمة التي تريد الترويج لها؟",
      ],
      restaurant: [
        "رائع! مطعم هو مشروع ممتاز. سأحتاج لبعض التفاصيل: ما نوع المأكولات التي تقدمونها؟ وما هو الجو العام للمطعم؟",
        "ممتاز! أحب مشاريع المطاعم. هل تريد التركيز على الطعام المنزلي أم الفاخر؟ وما أهم ميزة تنافسية لديك؟",
      ],
      tech: [
        "ممتاز! التطبيقات التقنية مجال رائع. أخبرني أكثر: ما المشكلة التي يحلها تطبيقك؟ من هم المستخدمون المستهدفون؟",
        "رائع! التقنية مجال مثير. هل تريد التركيز على سهولة الاستخدام أم المميزات المتقدمة؟",
      ],
      general: [
        "فهمت! دعني أساعدك في تطوير هذه الفكرة. هل يمكنك إخباري أكثر عن جمهورك المستهدف؟",
        "هذا يبدو مثيراً للاهتمام! ما الهدف الرئيسي من صفحة الهبوط؟ زيادة المبيعات أم جمع العملاء المحتملين؟",
      ],
    },
    en: {
      greeting: [
        "Hello! I'm your AI assistant for creating landing pages. Tell me about your project and I'll help you build the perfect page.",
        "Welcome! Let me help you create a professional landing page. What type of business or service would you like to promote?",
      ],
      restaurant: [
        "Great! A restaurant is an excellent project. I need some details: What type of cuisine do you serve? What's the overall atmosphere?",
        "Excellent! I love restaurant projects. Do you want to focus on homestyle or fine dining? What's your main competitive advantage?",
      ],
      tech: [
        "Excellent! Tech applications are a great field. Tell me more: What problem does your app solve? Who are your target users?",
        "Great! Technology is an exciting field. Do you want to focus on ease of use or advanced features?",
      ],
      general: [
        "I understand! Let me help you develop this idea. Can you tell me more about your target audience?",
        "This sounds interesting! What's the main goal of your landing page? Increase sales or generate leads?",
      ],
    },
  }

  generateResponse(userMessage: string, language: "ar" | "en" = "en"): string {
    const lowerMessage = userMessage.toLowerCase()
    const responses = this.responses[language]

    // Detect project type
    if (lowerMessage.includes("restaurant") || lowerMessage.includes("مطعم") || lowerMessage.includes("food")) {
      return this.getRandomResponse(responses.restaurant)
    }

    if (
      lowerMessage.includes("tech") ||
      lowerMessage.includes("app") ||
      lowerMessage.includes("تطبيق") ||
      lowerMessage.includes("تقنية")
    ) {
      return this.getRandomResponse(responses.tech)
    }

    return this.getRandomResponse(responses.general)
  }

  generatePreviewData(userInput: string, language: "ar" | "en" = "en"): PreviewData {
    const lower = userInput.toLowerCase()

    if (lower.includes("restaurant") || lower.includes("مطعم")) {
      return {
        title: language === "ar" ? "مطعم الذواقة" : "Gourmet Restaurant",
        subtitle: language === "ar" ? "تجربة طعام لا تُنسى" : "An Unforgettable Dining Experience",
        primaryColor: "#dc2626",
        sections: ["Hero", "Menu", "About", "Reservations", "Contact"],
        features:
          language === "ar"
            ? ["مكونات طازجة", "طهاة خبراء", "أجواء مريحة"]
            : ["Fresh Ingredients", "Expert Chefs", "Cozy Atmosphere"],
        template: "restaurant",
      }
    }

    if (lower.includes("tech") || lower.includes("app") || lower.includes("تطبيق")) {
      return {
        title: language === "ar" ? "تطبيق المستقبل" : "Future App",
        subtitle: language === "ar" ? "حلول تقنية متقدمة" : "Advanced Tech Solutions",
        primaryColor: "#7c3aed",
        sections: ["Hero", "Features", "Screenshots", "Download", "Support"],
        features:
          language === "ar" ? ["سهل الاستخدام", "آمن", "أداء سريع"] : ["User Friendly", "Secure", "Fast Performance"],
        template: "tech",
      }
    }

    // Default
    return {
      title: language === "ar" ? "مشروعك المميز" : "Your Amazing Project",
      subtitle: language === "ar" ? "بناء بالذكاء الاصطناعي" : "Built with AI-powered Chat2Site",
      primaryColor: "#3b82f6",
      sections: ["Hero", "Features", "About", "Contact"],
      features:
        language === "ar"
          ? ["ميزة رائعة 1", "ميزة رائعة 2", "ميزة رائعة 3"]
          : ["Amazing Feature 1", "Amazing Feature 2", "Amazing Feature 3"],
      template: "general",
    }
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

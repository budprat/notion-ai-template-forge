
import { TemplateRequest, TemplateResult } from "../types";

export const generateTemplate = async (request: TemplateRequest): Promise<TemplateResult> => {
  try {
    // In a real app with Supabase integration, this would call a secure API endpoint
    // For now, we'll simulate a response for frontend demonstration
    
    // Simulated loading time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templateTitle = `${request.style.charAt(0).toUpperCase() + request.style.slice(1)} ${
      request.customInterest || request.interest
    } Template`;
    
    const interest = request.customInterest || request.interest;
    
    const descriptions = {
      minimal: `A clean, distraction-free template for ${interest} with essential sections and minimalist design.`,
      professional: `A comprehensive, business-ready template for ${interest} with structured sections and formal layout.`,
      colorful: `A vibrant, engaging template for ${interest} with color-coded sections and visual organization.`,
      creative: `An inspiring, free-form template for ${interest} with unique layouts and creative prompts.`,
      academic: `A scholarly, research-oriented template for ${interest} with citation areas and structured note-taking.`
    };

    const contents = {
      minimal: `# ${templateTitle}\n\n## Overview\n- Quick summary of your ${interest} content\n\n## Key Items\n- [ ] Important task 1\n- [ ] Important task 2\n\n## Notes\nAdd your thoughts here...\n\n## Resources\n- Link 1\n- Link 2`,
      
      professional: `# ${templateTitle}\n\n## Executive Summary\nBrief overview of the ${interest} objectives and outcomes.\n\n## Agenda\n1. Introduction\n2. Current Status\n3. Goals & Metrics\n4. Action Items\n5. Timeline\n6. Resources Required\n\n## Key Stakeholders\n- Person A - Role\n- Person B - Role\n\n## Notes & Action Items\n| Item | Owner | Deadline | Status |\n|------|-------|----------|--------|\n| Task 1 | TBD | MM/DD/YY | Pending |\n| Task 2 | TBD | MM/DD/YY | Pending |`,
      
      colorful: `# 🌈 ${templateTitle} 🌈\n\n## 🚀 Goals\n- Big goal 1\n- Big goal 2\n\n## 📋 Main Categories\n### 🔴 Category One\n- Item 1\n- Item 2\n\n### 🟠 Category Two\n- Item 1\n- Item 2\n\n### 🟢 Category Three\n- Item 1\n- Item 2\n\n## 📝 Notes\nYour colorful thoughts go here!\n\n## ✨ Inspiration\n> Add a quote or inspiration related to ${interest}`,
      
      creative: `# ✨ ${templateTitle} ✨\n\n## 💭 Brainstorm Cloud\n- Idea 1...\n- What if...?\n- Inspiration: ...\n\n## 🎨 Visual Board\n[Insert images, sketches, or mood board here]\n\n## 🔄 Workflow\nStart → Explore → Create → Refine → Share\n\n## 💡 Random Prompts\n1. What if you approached ${interest} from an entirely different angle?\n2. How would a child view this ${interest} challenge?\n3. What's the most unconventional solution you can imagine?`,
      
      academic: `# ${templateTitle}\n\n## Research Question\nWhat aspects of ${interest} are most significant for...?\n\n## Literature Review\n### Key Sources\n1. Author, A. (Year). *Title*. Journal, Volume(Issue), pages.\n   - Main findings:\n   - Methodology:\n   - Limitations:\n\n## Methodology\n- Approach:\n- Data collection:\n- Analysis methods:\n\n## Findings\n- Finding 1:\n- Finding 2:\n\n## Discussion\n[Analysis of findings in relation to existing literature]\n\n## References\n[In appropriate citation format]`
    };

    return {
      title: templateTitle,
      description: descriptions[request.style as TemplateStyle] || descriptions.minimal,
      content: contents[request.style as TemplateStyle] || contents.minimal,
      date: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error("Error generating template:", error);
    throw new Error("Failed to generate template. Please try again.");
  }
};

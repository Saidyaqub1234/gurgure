<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Strategic Transformation: A Roadmap for Afghan Enterprises',
                'slug' => 'strategic-transformation-afghan-enterprises',
                'excerpt' => 'Discover how Afghan businesses can navigate strategic transformation with practical roadmaps, feasibility studies, and institutional assessments.',
                'content' => 'In today\'s rapidly evolving business landscape, Afghan enterprises face unique challenges and opportunities. Strategic transformation is not merely about adopting new technologies—it requires a comprehensive approach that encompasses organizational development, market positioning, and operational excellence. At GURGURE, we guide organizations through every step of this journey, from initial institutional assessments to detailed strategic roadmaps. Our approach integrates business planning with feasibility studies to ensure that every strategic decision is grounded in data and aligned with long-term objectives. Through our work with emerging businesses across Afghanistan, we have seen firsthand how a well-crafted strategic plan can unlock growth, attract investment, and build resilience in challenging markets.',
                'author' => 'GURGURE Team',
                'is_published' => true,
            ],
            [
                'title' => 'The Power of Branding in Afghanistan\'s Emerging Market',
                'slug' => 'power-of-branding-afghanistan',
                'excerpt' => 'Branding is more than a logo. Learn why a strong brand identity is a critical asset for businesses operating in Afghanistan\'s competitive landscape.',
                'content' => 'In emerging markets like Afghanistan, branding serves as a powerful differentiator that builds trust, communicates values, and creates lasting connections with customers. A well-executed brand strategy goes beyond visual identity to encompass the entire customer experience—from first impression to ongoing engagement. GURGURE\'s branding methodology combines international best practices with deep local market understanding. We help organizations develop cohesive visual systems that resonate with their target audiences while maintaining consistency across all touchpoints. Whether it\'s a complete corporate identity overhaul or a targeted campaign, our creative team delivers solutions that elevate market presence and drive business results. The most successful brands in Afghanistan today are those that have invested in authentic, professionally-crafted brand identities that reflect their unique value propositions.',
                'author' => 'GURGURE Team',
                'is_published' => true,
            ],
            [
                'title' => 'Digital Transformation: Moving Beyond the Hype',
                'slug' => 'digital-transformation-beyond-hype',
                'excerpt' => 'Digital transformation is about fundamentally rethinking how your organization operates. Here\'s how to approach it strategically.',
                'content' => 'Digital transformation has become a buzzword, but its true meaning lies in fundamentally rethinking how organizations operate, deliver value, and engage with stakeholders. For Afghan organizations, the digital journey starts with understanding specific needs rather than chasing trends. GURGURE\'s approach to digital transformation begins with a thorough assessment of existing systems, processes, and capabilities. We then design custom digital solutions—from websites and learning management systems to enterprise resource planning platforms—that address real business challenges. Our expertise spans database design, system architecture, and custom software development, ensuring that every solution is built on a solid technical foundation. The key is to prioritize initiatives that deliver measurable impact, whether through improved operational efficiency, enhanced customer experiences, or new revenue streams. By taking a phased, strategic approach, organizations can achieve sustainable digital transformation that drives long-term growth.',
                'author' => 'GURGURE Team',
                'is_published' => true,
            ],
            [
                'title' => 'ICT Infrastructure: Building the Backbone of Modern Business',
                'slug' => 'ict-infrastructure-modern-business',
                'excerpt' => 'Reliable ICT infrastructure is the foundation of any modern organization. Explore best practices for network design, implementation, and optimization.',
                'content' => 'In an increasingly connected world, robust ICT infrastructure is the backbone of successful business operations. From local area networks to wide area connectivity, the quality of an organization\'s technology infrastructure directly impacts productivity, security, and scalability. GURGURE provides end-to-end ICT consulting and implementation services, helping organizations design network architectures that meet current needs while accommodating future growth. Our expertise covers LAN and WAN design, system architecture planning, and network optimization. We work closely with clients to understand their operational requirements, security needs, and budget constraints, delivering solutions that balance performance with cost-effectiveness. Whether setting up a new office network or modernizing an existing infrastructure, our team ensures that technology serves as an enabler rather than a bottleneck. In Afghanistan\'s developing digital ecosystem, investing in proper ICT infrastructure is not just an operational necessity—it is a strategic advantage.',
                'author' => 'GURGURE Team',
                'is_published' => true,
            ],
            [
                'title' => 'The Art of the Pitch: Crafting Investor-Ready Presentations',
                'slug' => 'art-of-the-pitch-investor-presentations',
                'excerpt' => 'A compelling pitch deck can make the difference between securing funding and being overlooked. Learn the elements of effective investor presentations.',
                'content' => 'In the competitive world of fundraising, a well-crafted pitch deck is essential for capturing investor attention and communicating your venture\'s value proposition. At GURGURE, we specialize in transforming complex business concepts into clear, compelling narratives that resonate with investors. Our approach combines strategic storytelling with professional design to create presentations that are both informative and visually engaging. We guide entrepreneurs through the process of articulating their vision, market opportunity, business model, and financial projections in a concise and persuasive manner. The most effective pitch decks tell a story that investors can connect with—one that clearly explains the problem being solved, the uniqueness of the solution, and the potential for returns. With Afghanistan\'s startup ecosystem growing, having a professional, investor-ready pitch deck is no longer optional—it is a critical tool for success.',
                'author' => 'GURGURE Team',
                'is_published' => true,
            ],
            [
                'title' => 'Education Technology in Afghanistan: Opportunities and Challenges',
                'slug' => 'education-technology-afghanistan',
                'excerpt' => 'EdTech is transforming education delivery in Afghanistan. Explore the opportunities, challenges, and how institutions can leverage digital learning platforms.',
                'content' => 'Educational technology is reshaping how knowledge is delivered and accessed in Afghanistan. From learning management systems to digital content platforms, technology offers unprecedented opportunities to expand educational access and improve learning outcomes. GURGURE has been at the forefront of this transformation, developing custom LMS solutions for educational institutions across the country. Our platforms support remote learning, course management, student tracking, and assessment delivery—all tailored to the specific needs of Afghan educational contexts. However, successful EdTech implementation requires more than just technology. It demands thoughtful integration with existing curricula, adequate training for educators, and reliable infrastructure to support digital delivery. Despite these challenges, the potential impact is immense: digital learning platforms can reach students in remote areas, provide flexible learning options, and enable institutions to scale their offerings efficiently.',
                'author' => 'GURGURE Team',
                'is_published' => true,
            ],
        ];

        foreach ($blogs as $b) {
            Blog::firstOrCreate(['slug' => $b['slug']], $b);
        }
    }
}

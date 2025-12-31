-- 1. Insert Services (Services table)
INSERT INTO services (title_ar, title_en, description_ar, description_en, icon_name, display_order)
VALUES
('استشارات التحول الرقمي', 'Digital Transformation Consulting', 'تطوير استراتيجيات شاملة لنقل مؤسستك إلى العصر الرقمي بكفاءة عالية.', 'Developing comprehensive strategies to efficiently transition your organization into the digital age.', 'Lightbulb', 1),
('تطوير حلول الذكاء الاصطناعي', 'AI Solutions Development', 'بناء نماذج ذكاء اصطناعي مخصصة وأتمتة العمليات لزيادة الإنتاجية.', 'Building custom AI models and automating processes to boost productivity.', 'BrainCircuit', 2),
('تطوير البرمجيات المتقدمة', 'Advanced Software Development', 'تصميم وبناء تطبيقات ويب وموبايل متطورة باستخدام أحدث التقنيات.', 'Designing and building advanced web and mobile applications using the latest technologies.', 'Code', 3);

-- 2. Insert Projects (Projects table)
INSERT INTO projects (slug, title_ar, title_en, category, image_url, description_ar, description_en, technologies, featured)
VALUES
('smart-inventory-system', 'نظام إدارة المخزون الذكي', 'Smart Inventory System', 'SaaS', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', 'نظام سحابي متكامل لإدارة المخزون يعتمد على الذكاء الاصطناعي للتنبؤ بالطلب.', 'A comprehensive cloud-based inventory management system using AI for demand forecasting.', ARRAY['React', 'Node.js', 'AI'], true),
('edtech-platform', 'منصة تعليمية تفاعلية', 'Interactive EdTech Platform', 'Web App', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80', 'منصة تعليم إلكتروني تدعم الفصول الافتراضية والتقييمات الذكية.', 'E-learning platform supporting virtual classrooms and smart assessments.', ARRAY['Next.js', 'Supabase', 'WebRTC'], true);

-- 3. Insert Stats (Site Stats table)
INSERT INTO site_stats (key, label_ar, label_en, value, icon)
VALUES
('years_experience', 'سنوات الخبرة', 'Years Experience', '+20', 'Calendar'),
('projects_completed', 'مشروع ناجح', 'Projects Completed', '+150', 'CheckCircle'),
('cost_saved', 'خفض التكاليف', 'Cost Reduction', '40%', 'TrendingDown');

-- 4. Insert Testimonials (Testimonials table)
INSERT INTO testimonials (client_name_ar, client_name_en, company, feedback_ar, feedback_en, rating)
VALUES
('محمد علي', 'Mohamed Ali', 'Tech Corp', 'العمل مع أحمد كان نقلة نوعية لشركتنا. الحلول التي قدمها وفرت علينا الكثير من الوقت والمال.', 'Working with Ahmad was a game changer for our company. The solutions provided saved us a lot of time and money.', 5),
('سارة سمير', 'Sarah Samir', 'Future Vision', 'احترافية عالية ودقة في التنفيذ. أنصح بشدة بالتعامل معه.', 'High professionalism and precision in execution. Highly recommended.', 5);


export interface Classification {
    project: string;
    mainCategory: string;
    subCategory: string;
}

const TAXONOMY_RULES = [
    // 1. HayahLearn (HL)
    { keywords: ['lesson', 'curriculum', 'student', 'grade', 'school', 'exam', 'quiz', 'course', 'video_lecture'], project: 'HL', main: 'Education', sub: 'Content' },
    { keywords: ['teacher', 'instructor', 'faculty'], project: 'HL', main: 'Education', sub: 'Staff' },

    // 2. ValueMaker (VM)
    { keywords: ['product', 'feature', 'spec', 'design', 'mockup', 'wireframe', 'ui', 'ux'], project: 'VM', main: 'Product', sub: 'Design' },
    { keywords: ['brand', 'logo', 'identity', 'color', 'palette'], project: 'VM', main: 'Brand', sub: 'Assets' },
    { keywords: ['marketing', 'campaign', 'ad', 'social', 'post', 'instagram', 'facebook'], project: 'TP', main: 'Marketing', sub: 'Social' },

    // 3. Operations (OR)
    { keywords: ['invoice', 'receipt', 'bill', 'payment', 'salary', 'payroll'], project: 'OR', main: 'Finance', sub: 'Invoices' },
    { keywords: ['contract', 'agreement', 'legal', 'nda', 'terms'], project: 'OR', main: 'Legal', sub: 'Contracts' },
    { keywords: ['server', 'backup', 'database', 'sql', 'config', 'key', 'credential'], project: 'OR', main: 'Tech', sub: 'Infrastructure' },

    // 4. FamilyFirst (FF)
    { keywords: ['family', 'photo', 'trip', 'holiday', 'kids', 'home', 'personal'], project: 'FF', main: 'Personal', sub: 'Memories' }
];

export function classifyFile(filename: string): Classification {
    const nameLower = filename.toLowerCase();

    for (const rule of TAXONOMY_RULES) {
        if (rule.keywords.some(k => nameLower.includes(k))) {
            return {
                project: rule.project,
                mainCategory: rule.main,
                subCategory: rule.sub
            };
        }
    }

    // Default Fallback
    return {
        project: 'OR',
        mainCategory: 'Unsorted',
        subCategory: 'General'
    };
}

export function generateSovereignCode(project: string, main: string, sub: string, serial: number): string {
    const p = project.toUpperCase();
    const m = main.slice(0, 3).toUpperCase();
    const s = sub.slice(0, 3).toUpperCase();
    const seq = String(serial).padStart(3, '0');
    return `${p}-${m}-${s}-${seq}`;
}

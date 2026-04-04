import fs from 'fs';
import path from 'path';

/**
 * Auto-detect screenshot images from a project's screenshots folder.
 * Scans public/projects/<folder>/ for image files and sorts them
 * by the trailing number in the filename.
 * 
 * e.g. "homepage-1.png", "dashboard-2.png", "settings-3.png"
 * will be sorted as [1, 2, 3] regardless of the prefix text.
 */
export function getProjectScreenshots(screenshotsFolder) {
    if (!screenshotsFolder) return [];

    const dirPath = path.join(process.cwd(), 'public', 'projects', screenshotsFolder);

    try {
        if (!fs.existsSync(dirPath)) return [];

        const files = fs.readdirSync(dirPath);

        const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        // Sort by trailing number in filename
        // e.g. "homepage-1.png" → extracts 1, "dashboard-2.png" → extracts 2
        imageFiles.sort((a, b) => {
            const numA = extractTrailingNumber(a);
            const numB = extractTrailingNumber(b);
            return numA - numB;
        });

        return imageFiles.map(file => `/projects/${screenshotsFolder}/${file}`);
    } catch (error) {
        console.warn(`Could not read screenshots from ${dirPath}:`, error.message);
        return [];
    }
}

/**
 * Extract the trailing number from a filename (before the extension).
 * "homepage-1.png" → 1
 * "dashboard-02.png" → 2
 * "3.png" → 3
 * "no-number.png" → Infinity (sorts last)
 */
function extractTrailingNumber(filename) {
    const nameWithoutExt = path.basename(filename, path.extname(filename));
    const match = nameWithoutExt.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : Infinity;
}

/**
 * Enrich all projects with auto-detected screenshots.
 */
export function enrichProjectsWithScreenshots(projects) {
    return projects.map(project => ({
        ...project,
        screenshots: getProjectScreenshots(project.screenshots_folder)
    }));
}

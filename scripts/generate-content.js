import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../public/content');
const TIKZ_DIR = path.join(__dirname, '../tikz');
const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_FILE = path.join(__dirname, '../public/posts.json');

// --- Helper: Ensure directories exist ---
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// --- 1. Parse Markdown Frontmatter ---
function parseFrontmatter(content) {
    const match = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
    if (!match) return null;

    const frontmatterRaw = match[1];
    const metadata = {};
    
    frontmatterRaw.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            
            // Handle arrays like [Tag1, Tag2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(s => s.trim());
            }
            metadata[key] = value;
        }
    });

    return metadata;
}

function generateBlogIndex() {
    ensureDir(CONTENT_DIR);
    ensureDir(path.dirname(OUTPUT_FILE));

    const posts = [];
    
    if (fs.existsSync(CONTENT_DIR)) {
        const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
        
        files.forEach(file => {
            const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
            const metadata = parseFrontmatter(content);
            
            if (metadata) {
                // If excerpt is missing, try to generate it from content
                let excerpt = metadata.excerpt || '';
                if (!excerpt) {
                   const contentBody = content.replace(/^---[\s\S]*?---/, '').trim();
                   // Get first paragraph that isn't a heading
                   const match = contentBody.match(/^(?!#)(.+)$/m);
                   if (match) {
                       excerpt = match[1].slice(0, 150) + (match[1].length > 150 ? '...' : '');
                   }
                }

                posts.push({
                    id: file.replace('.md', ''),
                    path: `/content/${file}`,
                    title: metadata.title || 'Untitled',
                    date: metadata.date || 'No Date',
                    tags: metadata.tags || [],
                    excerpt: excerpt,
                    // We don't include full content in index to keep it small
                });
            }
        });
    } else {
        console.warn(`Warning: Content directory ${CONTENT_DIR} not found.`);
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`Successfully generated index with ${posts.length} posts at ${OUTPUT_FILE}`);
}

// --- 2. Compile TikZ to SVG ---
function compileTikZ() {
    if (!fs.existsSync(TIKZ_DIR)) {
        console.log("No 'tikz' directory found, skipping compilation.");
        return;
    }

    ensureDir(IMAGES_DIR);
    const files = fs.readdirSync(TIKZ_DIR).filter(file => file.endsWith('.tex'));

    files.forEach(file => {
        const inputPath = path.join(TIKZ_DIR, file);
        const fileNameNoExt = file.replace('.tex', '');
        const outputPath = path.join(IMAGES_DIR, `${fileNameNoExt}.svg`);
        const tempPdfPath = path.join(TIKZ_DIR, `${fileNameNoExt}.pdf`);

        console.log(`Compiling ${file}...`);

        try {
            // Check if tools exist first
            try {
                execSync('which pdflatex', { stdio: 'ignore' });
            } catch (e) {
                console.warn('⚠ pdflatex not found. Skipping TikZ compilation.');
                return;
            }

            try {
                execSync('which pdf2svg', { stdio: 'ignore' });
            } catch (e) {
                console.warn('⚠ pdf2svg not found. Skipping TikZ compilation.');
                return;
            }

            // 1. pdflatex (produces PDF in same dir)
            // -interaction=nonstopmode prevents hanging on errors
            execSync(`pdflatex -interaction=nonstopmode -output-directory="${TIKZ_DIR}" "${inputPath}"`, { stdio: 'pipe' });

            // 2. pdf2svg
            execSync(`pdf2svg "${tempPdfPath}" "${outputPath}"`, { stdio: 'pipe' });

            console.log(`✓ Generated ${outputPath}`);

            // Cleanup aux/log/pdf files
            const extensions = ['.aux', '.log', '.pdf', '.fls', '.fdb_latexmk', '.synctex.gz'];
            extensions.forEach(ext => {
                const f = path.join(TIKZ_DIR, fileNameNoExt + ext);
                if (fs.existsSync(f)) fs.unlinkSync(f);
            });

        } catch (error) {
            console.error(`✗ Failed to compile ${file}. Ensure pdflatex and pdf2svg are installed.`);
             console.error(error.message); 
        }
    });
}

// --- Run ---
console.log("Starting build process...");
generateBlogIndex();
compileTikZ();
console.log("Build complete.");

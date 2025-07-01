export function formatTitle(title: string) {
    const words = title.split(' ');
    const maxCharacterCount = 40; // Adjust this character count as needed

    if (words.length > 5) {
        const truncatedTitle = words.slice(0, 7).join(' ');
        if (truncatedTitle.length <= maxCharacterCount) {
            return truncatedTitle + ' ...';
        } else {
            // If the truncated title is still too long, cut it to fit within the character limit
            return truncatedTitle.slice(0, maxCharacterCount - 3) + ' ...';
        }
    }

    return title;
}

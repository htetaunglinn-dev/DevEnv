import { TArticle } from "@/interfaces/articles.interface";

// Generic filter function
export const filterByText = <T>(
  items: T[],
  searchText: string,
  key: keyof T, // The field to filter on (e.g., 'title')
): T[] => {
  if (searchText.trim() === "") {
    return items; // Return full list if search is empty
  }
  return items.filter((item) =>
    String(item[key]).toLowerCase().includes(searchText.toLowerCase()),
  );
};

// Specific version for articles (optional, if you want a typed shortcut)
export const filterArticlesByTitle = (
  articles: TArticle[],
  searchText: string,
): TArticle[] => {
  return filterByText(articles, searchText, "title");
};

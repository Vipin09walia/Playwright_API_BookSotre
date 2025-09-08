export function uniqueSuffix(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function randomUsername(prefix = 'user'): string {
  return `${prefix}_${uniqueSuffix()}`;
}

export function randomBook() {
  return {
    title: `Book_${uniqueSuffix()}`,
    author: `Author_${uniqueSuffix()}`
  };
}
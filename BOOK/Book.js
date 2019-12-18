
class Book {
    constructor(title, author, pages, description, currentPage, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.description = description;
      this.currentPage = currentPage;
      this.read = read;
    }
  
    readBook(pageNumber) {
      if (typeof pageNumber !== 'number') {
        return 'Page Number Invalid';
      } else if (pageNumber === this.pages) {
        return this.read = true;
      }
      return this.currentPage = pageNumber;
    }
  };
  
  export { Book };
  
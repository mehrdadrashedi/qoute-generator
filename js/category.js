const template = document.createElement("template");

template.innerHTML = `
        <link rel="stylesheet" href="./css/category-style.css">
        <div class="category-item">
            <h1 class"category"><slot></slot></h1>
        </div>
`;

class CategoryItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export { CategoryItem };

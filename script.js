const articlesMain = document.querySelector("#articles main");
const indexMain = document.querySelector("#index main");


function createElement(tag, textContent) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  return element;
}

function createImageElement(src, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
}


function createProductSection(product, container) {
  const section = document.createElement("section");
  
  const img = createImageElement(product.bild, product.namn);
  section.appendChild(img);

  const div = createElement("div", "");
  section.appendChild(div);
  
const h2 = createElement("h2", product.namn);
  div.appendChild(h2);

  const p = createElement("p", product.beskrivning);
  div.appendChild(p);
  
  const price = createElement("p", `Pris: ${product.pris} kr`);
  div.appendChild(price);
  
  container.appendChild(section);
}

async function fetchData() {
  try {
    const responce = await fetch("./produkter.json");

    if (!responce.ok) {
      throw new Error("Fetch is failed!");
    }

    const data = await responce.json();
    console.log(data);

    //skapa bara en artikel på index-sidan
    if (indexMain) {
      createProductSection(data.produkter[0], indexMain);
    }

    //skapa alla artiklar på artiklar-sidan
    if (articlesMain) {
      data.produkter.forEach((product) => {
        createProductSection(product, articlesMain);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();

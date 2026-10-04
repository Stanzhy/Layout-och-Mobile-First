const artiklarContainer = document.getElementById("articlesContainer");
const indexContainer = document.getElementById("indexContainer");

function createProductSection(product, container) {
  const section = document.createElement("section");
  const h2 = document.createElement("h2");
  h2.textContent = product.namn;
  section.appendChild(h2);
  const img = document.createElement("img");
  img.src = product.bild;
  img.alt = product.namn;
  section.appendChild(img);
  const p = document.createElement("p");
  p.textContent = product.beskrivning;
  section.appendChild(p);
  const price = document.createElement("p");
  price.textContent = `Pris: ${product.pris} kr`;
  section.appendChild(price);
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
    if (indexContainer) {
      createProductSection(data.produkter[0], indexContainer);
    }

    //skapa alla artiklar på artiklar-sidan
    if (artiklarContainer) {
      data.produkter.forEach((product) => {
        createProductSection(product, artiklarContainer);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();

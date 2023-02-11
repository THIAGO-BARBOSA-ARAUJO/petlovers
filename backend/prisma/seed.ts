import prisma from "../src/config/database";


async function CreateBestSellers() {
    await prisma.bestsellers.create({
      data: {
        img: "https://www.petlove.com.br/images/products/259806/product/Ra%C3%A7%C3%A3o_Pedigree_Carne_Frango_e_Cereais_C%C3%A3es_Filhotes_18_kg_2513333.png?1659451710",
        name: "Ração Pedigree para Cães",
      },
    });

    await prisma.bestsellers.create({
      data: {
        img: "https://www.petlove.com.br/images/products/257798/product/Moletom_Future_Pet_La_Casa_de_Papel_Preto_para_C%C3%A3es_2785245_1.jpg?1656959468",
        name: "Moletom Future Pet La Casa de Papel Preto para Cães",
      },
    });

    await prisma.bestsellers.create({
      data: {
        img: "https://www.petlove.com.br/images/products/205424/product/Tigela_Vida_Mansa_Alum%C3%ADnio_Azul_2172873.jpg?1627658740",
        name: "Tigela Vida Mansa Alumínio Azul",
      },
    });
}

async function CreateProducts() {
  await prisma.products.create({
    data: {
          animal: "dog", 
          category: "acessory",
          img_url: "https://www.petlove.com.br/images/products/205424/product/Tigela_Vida_Mansa_Alum%C3%ADnio_Azul_2172873.jpg?1627658740",
          name: "Tigela Vida Mansa Alumínio Azul",
          price: 13491,
          stock: 30,
          description: "Uma tijela de aluminio parao seu dog"
        
    },
  });
    
    await prisma.products.create({
      data: {
        animal: "dog",
        category: "food",
        img_url:
          "https://www.petlove.com.br/images/products/259806/product/Ra%C3%A7%C3%A3o_Pedigree_Carne_Frango_e_Cereais_C%C3%A3es_Filhotes_18_kg_2513333.png?1659451710",
        name: "Ração Seca Pedigree para Cães",
        price: 22229,
        stock: 20,
        description: "Uma ração de boa qualidade para seu cachorro",
      },
    });

     await prisma.products.create({
       data: {
         animal: "dog",
         category: "acessory",
         img_url:
           "https://www.petlove.com.br/images/products/259082/product/Peitoral_Antipux%C3%A3o_Future_Pet_%C3%82ngulos_para_C%C3%A3es_2814120_0002_Geral_La_Casa_de_Papel_Preto_Custom.jpg?1658855208",
         name: "Peitoral Antipuxão Future Pet Ângulos para Cães",
         price: 9518,
         stock: 15,
         description: "Uma coleira do tipo peitoral para seu cão",
       },
     });
    
    await prisma.products.create({
      data: {
        animal: "dog",
        category: "acessory",
        img_url:
          "https://www.petlove.com.br/images/products/261104/product/Comedouro_Future_Pet_Play_Netflix_2785229_%281%29.jpg?1660654231",
        name: "Comedouro Future Pet Play Netflix",
        price: 4752,
        stock: 5,
        description:
          "Indicado para cães de todas as idades e de todos os portes",
      },
    });

    await prisma.products.create({
      data: {
        animal: "dog",
        category: "acessory",
        img_url:
          "https://www.petlove.com.br/images/products/253675/product/Padr%C3%A3o_%281%29_0018_2785304_1.jpg?1651760225",
        name: "Brinquedo Bolinha Future Pet Netflix para Cães",
        price: 6291,
        stock: 10,
        description:
          "É importante lembrar que nenhum brinquedo é 100% indestrutível e a brincadeira precisa ser monitorada",
      },
    });

    await prisma.products.create({
      data: {
        animal: "cat",
        category: "acessory",
        img_url:
          "https://www.petlove.com.br/images/products/251082/product/Banheiro_Fechado_Happy_Cat_-_Azul_3105171_%283%29.jpg?1637857751",
        name: "Banheiro Fechado Happy Cat - Azul",
        price: 16371,
        stock: 13,
        description:
          "Tem como objetivo impedir que os gatos joguem a areia para fora da caixa",
      },
    });

    await prisma.products.create({
      data: {
        animal: "cat",
        category: "acessory",
        img_url:
          "https://www.petlove.com.br/images/products/145741/product/7898491032180_1.jpg?1627525327",
        name: "Brinquedo Arranhador Chalesco Kitty com Catnip",
        price: 6920,
        stock: 27,
        description:
          "Incentiva atividade física, indicado para gatos de todos os portes",
      },
    });

    await prisma.products.create({
      data: {
        animal: "cat",
        category: "food",
        img_url:
          "https://www.petlove.com.br/images/products/213995/product/Ra%C3%A7%C3%A3o_%C3%9Amida_Sach%C3%AA_Special_Cat_Frango_para_Gatos_Filhotes_-_85_g__2419851.jpg?1627687008",
        name: "Ração Úmida Special Cat Sachê Frango para Gatos Filhotes",
        price: 269,
        stock: 27,
        description: "Alimento completo e balanceado",
      },
    });
}

CreateBestSellers()
CreateProducts()
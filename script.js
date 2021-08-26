let cart = [];
let modalQuantidade = 1;
let modalKey = 0;
const query = (el) => document.querySelector(el);
const queryAll = (el) => document.querySelectorAll(el);

//Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = query('.models .pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQuantidade = 1;
        modalKey = key;

        query('.pizzaBig img').src = pizzaJson[key].img;
        query('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        query('.pizzaInfo--desc').innerHTML= pizzaJson[key].description;
        query('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        query('.pizzaInfo--size.selected').classList.remove('selected');
        queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        query('.pizzaInfo--qt').innerHTML = modalQuantidade;
        query('.pizzaWindowArea').style.opacity = 0;
        query('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            query('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    query('.pizza-area').append(pizzaItem);
});

//Eventos do modal
function closeModal() {
    query('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        query('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

queryAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
});

query('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQuantidade > 1) {
        modalQuantidade--;
        query('.pizzaInfo--qt').innerHTML = modalQuantidade;
    }    
});

query('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQuantidade++;
    query('.pizzaInfo--qt').innerHTML = modalQuantidade;
});

queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
   size.addEventListener('click', (e) => {
    query('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
   });
});

query('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(query('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item) => item.identifier == identifier);
    if (key > -1) {
        cart[key].qt += modalQuantidade;
    } else {
        cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        size, //ou size:size
        qt:modalQuantidade,
    });
    }
    updateCart();
    closeModal();
});

function updateCart() {
    if(cart.length > 0) {
        query('aside').classList.add('show');
        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            console.log(pizzaItem);
        }
    } else {
        query('aside').classList.remove('show');
    }
}
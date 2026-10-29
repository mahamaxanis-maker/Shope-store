var product = [{
    id: 1,
    img: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/7bd1207382634a8c8e7a788f8d54db13_9366/Adizero_EVO_SL_Shoes_Woven_Yellow_JR2024_HM1.jpg',
    name: 'Adidas Shoes',
    price: 5800,
    description: 'Adidas Shoes Lorem ipsum dolor sit amet consectetur adipisicing elit Ad libero incidunt laborum doloribus consectetur aut',
    type: 'shoes'
}, {
    id: 2,
    img: 'https://www.misterrunning.com/images/2025-media-10/adidas-adizero-archive-giacca-da-running-uomo-black-hz3692-A.jpg',
    name: 'Adidas Jecket',
    price: 2800,
    description: 'Adidas Jecket Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus animi nulla error odio quis! Voluptatibus?',
    type: 'jecket'
}, {
    id: 3,
    img: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0b9d46b47c114a43a36faf1500889035_9366/Adicolor_Classics_Sprinter_Shorts_Black_HS2069_01_laydown.jpg',
    name: 'Adidas pants',
    price: 2100,
    description: 'Adidas Shortpants Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus animi nulla error odio quis! Voluptatibus?',
    type: 'pants'
}]
// [{}, {}, {}] // length

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += ` <div onclick="showProductDetail(${i})" class="product-items ${product[i].type }">
                     <img class="product-img" src="${product[i].img}" alt="">
                      <p style="font-size: 1.3vw;">${product[i].name}</p>
                      <p style="font-size: 1vw;">${numberWithCommas(product[i].price)}</p>
                 </div> `;
    }
    $("#productlist").html(html);
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    // console.log(`#`+elem.id)
    var value = $('#'+elem.id).val().toLowerCase()
    console.log(value)

     var html = '';
    for (let i = 0; i < product.length; i++) {
        if ( product[i].name.toLowerCase().includes(value) ){
              html += ` <div onclick="showProductDetail(${i})" class="product-items ${product[i].type }">
                     <img class="product-img" src="${product[i].img}" alt="">
                      <p style="font-size: 1.3vw;">${product[i].name}</p>
                      <p style="font-size: 1vw;">${numberWithCommas(product[i].price)}</p>
                 </div> `;
        }
      
    }
    if(html == '') {
        $("#productlist").html(`<p>No products found</p>`);
    } else {
        $("#productlist").html(html);
    }
  
}

function searhproduct(gotProduct) {
    console.log(gotProduct)
    $(".product-items").css('display', 'none')
    if(gotProduct == 'all') {
        $(".product-items").css('display', 'block') 
    }
    else {
        $("."+gotProduct).css('display', 'block')
    }

}
// funtion global //
var productindex = 0;

function showProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src',product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas (product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal() {
    $("#modalDesc ,#modalCart").css('display','none')    
}


// loop count // add to cart
var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }

    }

    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        //console.log(obj)
        cart.push(obj)
    }
    console.log(cart)
    

    //Fuction notification ของ swal
    Swal.fire({
        icon: 'success',
        title: ' Add ' + product[productindex].name + ' to cart !'
    })

    // call id cartcount to count how many product in cart
    $("#cartcount").css('display','flex').text(cart.length)

}

//comtainer cart/basket // onclick
function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}

//function count item in cart
function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="carlist-items">
                        <div class="carlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.3vw;">${cart[i].name}</p>
                                <p style="font-size: 1vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="carlist-right">
                            <p onclick="deinitem('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitem('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html('<p> NOT FOUND PRODUCT LIST </p>')
    }
}

function deinitem(action, index) {
    if(action == '-'){
        if(cart[index].count > 0){
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        cart.splice(index, 1);
                        rendercart();
                        $("#cartcount").css('display','flex').text(cart.length)
                        
                        if(cart.length <= 0) {
                            $("#cartcount").css('display','none')
                        }
                    }
                    else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count)
                    } 
                });
            }
        }
    }
    else if(action == '+'){
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
    }

}

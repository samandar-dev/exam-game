let list = document.querySelector('.game__list');
let items;
let arrCardinata = []
let arrObj = []
let randomItmes = []
let itemID = 1;
let inxCount = 0;

let modal = document.querySelector('.modal')
let time1 = document.querySelector('#time1');
let top__icon = document.querySelector('.top__icon');
let top__search = document.querySelector('.top__search');
let time2 = document.querySelector('#time2');
let price = document.querySelector('.top__price');
let resBtn = document.querySelector('.restart');
let Iconprice = document.querySelector('#Iconprice')
let timeCount1 = 5;
let timeCount2 = 60;
let iconPrice = 0
let priceItmes = 0

function reset() {
  location.reload();
}

iconPrice = 5
if (iconPrice >= 0) {
  top__icon.addEventListener('click', () => {
    Iconprice.innerHTML = iconPrice -= 1
    reset()
  })
}

setInterval(() => {
  if (timeCount1 == 0 && timeCount2 == 0) {
    timeCount1 = 0
    timeCount2 = 0
    modal.classList.add('open')
  }
  else if (timeCount2 >= 0) {
    time2.innerHTML = `: ${timeCount2 -= 1}`
  }
  else if (timeCount2 == -1) {
    time1.innerHTML = `${timeCount1 -= 1}`
    timeCount2 = 60
    time2.innerHTML = `: ${timeCount2 -= 1}`
  }
  console.log(timeCount2);
}, 1000)

resBtn.addEventListener('click', () => {
  modal.classList.add('none')
  let timeCount1 = 5;
  let timeCount2 = 60;
  reset()
})


for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 12; j++) {
    let obj = {
      x: j,
      y: i,
    }
    arrCardinata.push(obj)
  }
}

function addItmes() {
  for (let i = 0; i < 96; i++) {
    let li = document.createElement('li')
    li.className = "game__item";
    list.appendChild(li)
  }

  items = document.querySelectorAll('.game__item');

  arrCardinata.forEach((obj, inxx) => {
    items.forEach((ite, inn) => {
      if (inxx == inn) {
        ite.innerHTML = `
        <span class="items-cardinata">${obj.x} </span>
        <span class="items-cardinata">${obj.y}</span>`;
      }
    })
  })
} addItmes()


function addImgs() {
  items.forEach((itms, itxx) => {
    if (itms.childNodes[1].textContent == 1 || itms.childNodes[1].textContent == 12 ||
      itms.childNodes[3].textContent == 1 || itms.childNodes[3].textContent == 8) {
      itms.classList.add('itemsEmpty');
      itms.classList.add('empty');
    }
    else {
      itms.classList.add(`${inxCount}`)
      randomItmes.push(itemID)
      itemID++
      inxCount++
      if (itemID == 16) {
        itemID = 1
      }
    }
  })

  for (let i = 1; i <= 100; i++) {
    let ran1 = Math.floor(Math.random() * randomItmes.length)
    let ran2 = Math.floor(Math.random() * randomItmes.length)
    let n = randomItmes[ran1];
    randomItmes[ran1] = randomItmes[ran2]
    randomItmes[ran2] = n
  }

  items.forEach((itms) => {
    randomItmes.forEach((id, idxx) => {
      if (!itms.classList.contains('empty') && itms.classList[1] == idxx) {
        itms.id = id
      }
    })
  })

  items.forEach((itms, itxx) => {
    pokemons.forEach((imm, imxx) => {
      if (itms.id == imm.id && !itms.classList.contains('empty')) {
        itms.innerHTML += `
          <img class="game__img" id="${imm.id}" src="${imm.img}" alt="img">`;
      }
    })
  })

} addImgs()

let images = document.querySelectorAll('.game__img')

let clickCount = 0

let imgID_1 = 0
let imgID_2 = 0

let click_oneX = 0;
let click_oneY = 0;
let click_twoX = 0;
let click_twoY = 0;

let empArr1 = []
let empArr2 = []

let index = 0;

function clickFunc() {
  items.forEach((itm, itxx) => {
    itm.addEventListener('click', () => {
      clickCount++
      if (clickCount == 1) {
        index = itxx
        imgID_1 = itm.childNodes[5].id
        itm.childNodes[5].classList.add('click');
        itm.classList.add('actItems')

        click_oneX = itm.childNodes[1].textContent
        click_oneY = itm.childNodes[3].textContent
        compare1(click_oneX, click_oneY)
      }
      else if (clickCount == 2 && index != itxx) {
        imgID_2 = itm.childNodes[5].id
        itm.childNodes[5].classList.add('click');
        itm.classList.add('actItems')

        click_twoX = itm.childNodes[1].textContent
        click_twoY = itm.childNodes[3].textContent
        clickCount = 0
        compare2(click_twoX, click_twoY)
        remItemTwo(imgID_1, imgID_2, click_oneX, click_oneY, click_twoX, click_twoY)
        removItems(imgID_1, imgID_2)
      }
      else {
        clickCount = 0
        itm.classList.remove('actItems')
        itm.childNodes[5].classList.remove('click');
      }
    })
  })
} clickFunc()


function compare1(x, y) {
  empArr1 = []
  items.forEach((ittm, itxx) => {
    if (ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) && ittm.childNodes[3].textContent == eval(y) - 1 ||
      ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) + 1 && ittm.childNodes[3].textContent == eval(y) ||
      ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) && ittm.childNodes[3].textContent == eval(y) + 1 ||
      ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) - 1 && ittm.childNodes[3].textContent == eval(y)) {
      console.log(ittm);
      empArr1.push({
        x: ittm.childNodes[1].textContent,
        y: ittm.childNodes[3].textContent,
      })
    }
  })
}

function compare2(x, y) {
  empArr2 = []
  items.forEach((ittm, itxx) => {
    if (ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) && ittm.childNodes[3].textContent == eval(y) - 1 ||
      ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) + 1 && ittm.childNodes[3].textContent == eval(y) ||
      ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) && ittm.childNodes[3].textContent == eval(y) + 1 ||
      ittm.classList.contains('empty') && ittm.childNodes[1].textContent == eval(x) - 1 && ittm.childNodes[3].textContent == eval(y)) {
      console.log(ittm);
      empArr2.push({
        x: ittm.childNodes[1].textContent,
        y: ittm.childNodes[3].textContent,
      })
    }
  })
}


function removItems(img1ID, img2Id) {
  priceItmes += 5
  empArr1.forEach((em1, einx1) => {
    empArr2.forEach((em2, einx2) => {
      items.forEach((itms, itxx) => {
        images.forEach((img, imixx) => {
          if (em1.x == em2.x || em1.y == em2.y) {
            if (img1ID == img2Id && img.id == img1ID && img.id == img2Id && img.classList.contains('click')) {
              let nat = priceItmes
              price.innerHTML = nat
              img.remove()
            }
            else {
              img.classList.remove('click')
              itms.classList.remove('actItems')
            }
          }
        })
      })
    })
  })

  items.forEach((itm, inx) => {
    if (!itm.childNodes[5]) {
      itm.classList.add('empty')
      itm.classList.add('removItems');
    }
  })
}


function remItemTwo(imgId1, imgId2, x1, y1, x2, y2) {
  items.forEach((itm, inx) => {
    if (imgId1 == itm.id && itm.childNodes[1].textContent == eval(x1) && itm.childNodes[3].textContent == eval(y1) - 1) {
      images.forEach((imgs, inxx) => {
        if (imgs.classList.contains('click')) {
          console.log('top');
          priceItmes += 5
          let nat = priceItmes
          price.innerHTML = nat
          imgs.remove()
        }
        else {
          imgs.classList.remove('click')
          itm.classList.remove('actItems')
        }
      })
      return
    }
    else if (imgId1 == itm.id && itm.childNodes[1].textContent == eval(x1) + 1 && itm.childNodes[3].textContent == eval(y1)) {
      images.forEach((imgs, inxx) => {
        if (imgs.classList.contains('click')) {
          console.log('right');
          priceItmes += 5
          let nat = priceItmes
          price.innerHTML = nat
          imgs.remove()
        }
        else {
          imgs.classList.remove('click')
          itm.classList.remove('actItems')
        }
      })
      return
    }
    else if (imgId1 == itm.id && itm.childNodes[1].textContent == eval(x1) && itm.childNodes[3].textContent == eval(y1) + 1) {
      images.forEach((imgs, inxx) => {
        if (imgs.classList.contains('click')) {
          console.log('bootom');
          priceItmes += 5
          let nat = priceItmes
          price.innerHTML = nat
          imgs.remove()
        }
        else {
          imgs.classList.remove('click')
          itm.classList.remove('actItems')
        }
      })
      return
    }
    else if (imgId1 == itm.id && itm.childNodes[1].textContent == eval(x1) - 1 && itm.childNodes[3].textContent == eval(y1)) {
      images.forEach((imgs, inxx) => {
        if (imgs.classList.contains('click')) {
          console.log('left');
          priceItmes += 5
          let nat = priceItmes
          price.innerHTML = nat
          imgs.remove()
        }
        else {
          imgs.classList.remove('click')
          itm.classList.remove('actItems')
        }
      })
      return
    }
    else {
      images.forEach((imgs, inxx) => {
        if (!imgs.classList.contains('click')) {
          imgs.classList.remove('click')
        }
      })
      setTimeout(() => {
        itm.classList.remove('actItems')
      }, 200)
    }
  })
}

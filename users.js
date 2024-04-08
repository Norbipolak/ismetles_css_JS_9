class Users {
    usersHolder;
    nameHolder;
    birthDateHolder;
    ageHolder;
    emailHolder;
    addressHolder;
    userImgHolder;

    constructor() {
        this.usersHolder = document.querySelector("#users-holder");
        this.nameHolder = document.querySelector("#name");
        this.birthDateHolder = document.querySelector("#birth-date");
        this.ageHolder = document.querySelector("#age");
        this.emailHolder = document.querySelector("#email");
        this.addressHolder = document.querySelector("#address");
        this.userImgHolder = document.querySelector("#user-image");
    }

    async getUsers() {
        try {
            const response = await fetch("https://dummyjson.com/users");
            const json = await response.json();

            if (response.ok) {
                for (const user of json.users) {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user");

                    const nameH3 = document.createElement("h3");
                    nameH3.innerText = `${user.firstName} ${user.lastName}`;

                    const userImgDiv = document.createElement("div");
                    userImgDiv.classList.add("user-img");
                    const userImg = document.createElement("img");
                    userImg.src = user.image;
                    userImgDiv.appendChild(userImg);

                    const grid2Div = document.createElement("div");
                    grid2Div.classList.add("grid-2");
                    const openDiv = document.createElement("div");
                    openDiv.innerHTML = `<a href="user.html?id=${user.id}">Megnyitás</a>`;
                    const deleteDiv = document.createElement("div");
                    const deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "Törlés";
                    deleteDiv.appendChild(deleteBtn);

                    grid2Div.appendChild(openDiv);
                    grid2Div.appendChild(deleteDiv);

                    userDiv.appendChild(nameH3);
                    userDiv.appendChild(userImgDiv);
                    userDiv.appendChild(grid2Div);

                    this.usersHolder.appendChild(userDiv);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getUser(id) {
        try {
            const response = await fetch("https://dummyjson.com/users/" + id);
            const json = await response.json();
            console.log(json);

            this.nameHolder.innerText = `${json.firstName} ${json.lastName}`;

            this.birthDateHolder.innerText = json.birthDate;
            this.ageHolder.innerText = json.age;
            this.emailHolder.innerText = json.email;
            this.addressHolder.innerText = `${json.address.city}, ${json.address.address}`;
            this.userImgHolder.src = json.image;
        } catch (err) {
            console.log(err);
        }
    }
}

export default Users;

/*
A getUser-vel megjelnítettük az adatokat, amiket leszedtünk a dummyjson.com-ról 
Most azt csináljuk, hogy ezek input mezők lesznek és mi kitöltjük, majd lesz egy felülírás gomb 
és azzal visszük fel az adatokat 

de elötte megcsináljuk a törlést 

le van mentve nekünk egy deleteBtn-ünk a getUsers-ben metódusban 
->
deleteBtn.innerText = "Törlés";
deleteDiv.appendChild(deleteBtn);

Erre kell készítenünk egy eventListener-t, készítünk egy async metódust itt a class Users-ben és majd ezt adjuk meg az eventListener-nek
->
async deleteUser(id) {
try {
    const response = await fetch("https://dummyjson.com/users/ + id", {
        method: "DELETE"
    })

    const json = await response.json();

    if(response.ok) {
        alert("Sikeres törlés")
    } else {
        alert(json.message); 
    }

} catch(err) {
    console.log(err);
}
}

A törlés ugyanaz, mint a get, kell egy id
így néz ki a dummyjson.com-on 
->
fetch('https://dummyjson.com/users/1 , {
    method: 'DELETE'
}).then((res)=>res.json()).then(console.log)

és most, ahol lementettük a deleteBtn-t, tehát a getUsers()-ben, annak a legaljára csinálunk egy eventListener-t 

    async getUsers() {
        try {
            const response = await fetch("https://dummyjson.com/users");
            const json = await response.json();

            if(response.ok) {
                for(const user of json.users) {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user");

                    const nameH3 = document.createElement("h3");
                    nameH3.innerText = `${user.firstName} ${user.lastName}`;

                    const userImgDiv = document.createElement("div");
                    userImgDiv.classList.add("user-img");
                    const userImg = document.createElement("img");
                    userImg.src = user.image;
                    userImgDiv.appendChild(userImg);

                    const grid2Div = document.createElement("div");
                    grid2Div.classList.add("grid-2");
                    const openDiv = document.createElement("div");
                    openDiv.innerHTML = `<a href="user.html?id=${user.id}">Megnyitás</a>`;
                    const deleteDiv = document.createElement("div");
                    const deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "Törlés";
                    deleteDiv.appendChild(deleteBtn);

                    grid2Div.appendChild(openDiv);
                    grid2Div.appendChild(deleteDiv);

                    userDiv.appendChild(nameH3);
                    userDiv.appendChild(userImgDiv);
                    userDiv.appendChild(grid2Div);

                    this.usersHolder.appendChild(userDiv);

                    deleteBtn.addEventListener("click", ()=> {
                        this.deleteUser(user.id);
                    });
                }

Megcsináltuk az eventListener-t és abban meghívtuk a deleteUser-t, azért kell a callback function, mert meg a meghívásnál a .this 
hogy maga a classra utaljon a this és ne a gombra, meg hogy hozzáférjen az összes dologhoz, amit itt a class-ban csináltunk

Rákattintottunk a gombra és felül alert-ben kiírta, hogy Sikeres törlés!, amit ugye megadtunk, hogy amikor nincsen semmi gond akkor ezt írja ki
és visszakaptuk a teljes user objektumot egyfelöl, másfelöl pedig lesz még kettő extra property-je 
    - isDeleted: true;
    - deletedOn: 2024-04-01..

De mi van abban az esetben, hogyha mi beírunk egy random számot, hogy azt törölje ki
tehát a fetch első paramétere ez lesz -> "https://dummyjson.com/users/ + 6549",

Ugye nincsen ilyen user-ünk, kapunk egy hibaüzenetet ->
{message: 'User with id 6549 not found'}
    message: "User with id 6549 not found"

és ilyenkor amikor valami nem jó, akkor a json.message-t fogjuk kiírni
->
    if(response.ok) {
        alert("Sikeres törlés")
    } else {
        alert(json.message); -> pl. User with id 6549 not found
    }

Itt még az a fontos, hogyha letöröltünk egy az ténylegesen tünjön el, ehhez nekünk a userDiv-et kell nekünk letörölnünk  
ami mehet kérféleképpen
1. az egyik az, hogy átadjuk a userDiv-et a deleteUser-nek 
2. jobb módszer az, hogy a deleteUser egy visszatérési értékkel fog rendelkezni 
azzal kapcsolatban, hogy sikerült-e a törlés vagy sem, mert valójában neki, amit írtunk a try blokkban csak az a feladata, hogy 
letörölje az erőforrást, nem pedig az, hogy a html szerkezetben turkáljon!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Tehát, ha a response.ok az rendben volt, akkor ott return true; az else ágban meg azt modnjuk, hogy return false
és fontos, hogy a catch ágban is azt kell írni, hogy return false!!!!!!!!!!!!!!!!!!!!!!!
-> 

try {
    const reponse = await fetch("https://dummyjson.com/users/ + id, {
        method: "DELETE"
    });

    const json = await response.json();

    if(response.ok) {
        alert("Sikeres törlés!");
        return true;
    } else {
        alert(json.message);
        return false;
} catch(err) {
    console.log(err);
    return false;
    }

A deleteBtn-nél a callback function-t kénytelenek leszünk async-re változtatni, meg lehet csinálni then-vel is de így könnyebb 
-> 
deleteBtn.addEventListener("click" async ()=> {
    const isDeleted = await this.deleteUser(user.id)
    if(isDeleted)
        userDiv.remove(); !!!! remove-val tudunk html elemeket törölni!!!
})

A remove()-val tudjuk kiszedni a html szerkezetből kiszedni magát az elemet!!!
Csináltunk a deleteUser-ben, ha sikeres volt a törlés, akkor visszaad egy true-t 
1. itt ebben a sorban -> const isDeleted = await this.deleteUser(user.id)
    ez ki is törli, de nem a html szerkezetből és visszaad egy true-t, amit ugye ebbe a const isDeleted-ben tárolunk 
2. a második sorban meg if(isDeleted) -> tehát ez true lesz 
    akkor meg userDvi.remove()-val kitöröljük a html szerkezetből is!!!!!!!!!!!!
***************************************************************************************************************************************
Következő dolog

Most ugye ezek az adatok, hogy address, name, age stb. ezek egy div-ben vannak megjelenítve és azt szeretnék, hogy 
ezek input mezők legyenek 
a user html-ben ami itt nincsen megcsinálva, de az elöbbiben igen, leírom, hogy mik voltak a változások 
->
az összes div-et átírjuk input mezőre, meg ha már input mező, akkor meg kell adni a type-ot is!!!!!
<div id="birth-date"></div>
-> 
<input type="date" id="birth-date">
ugyanígy az id age, email, address div-et is átírjuk input-ra, mint itt elöbb és beállítjuk a megfelelő type-ot hozzá 

nagyon fontos, hogy most, mivel ezek div-ek voltak ezért innerText-ként volt megadva az érték
pl. this.ageHolder.innerText = json.birthdate;
de, mivel most ezeket átírtuk input mezőre, aminek nincsen innerText-je, hanem value-ja van 
innerText-eket átírjuk value-ra

this.nameHolder.innerText = `${json.firstName} ${json.lastName}`;

this.birthDateHolder.innerText = json.birthDate;
this.ageHolder.innerText = json.age;
this.emailHolder.innerText = json.email;
this.addressHolder.innerText = `${json.address.city}, ${json.address.address}`;

-> 
this.birthDateHolder.value = json.birthDate;
this.ageHolder.ivalue = json.age;
this.emailHolder.value = json.email;
this.addressHolder.value = `${json.address.city}, ${json.address.address}`;


Az adatok így megjelentek az input mezókben a böngészőben 

még a H3-as id="name"-t (<h3 id="name"></h3>) is átírjuk input-ra 
-> 
<h3>Name</h3>
<input type="text" id="name">

és ez így még nem is jó, mert kell egy firstName megy lastName is, mert úgy van a json-ben
amit beleteszünk majd egy grid-2-be és egy data-box-ba
->
    <div class="grid-2">
        <div class="data-box">
            <h4>First name</h4>
            <input type="text" id="first-name">
        </div>

        <div class="data-box">
            <h4>Last name</h4>
            <input type="text" id="last-name">
        </div>

this.nameHolder.innerText = `${json.firstName} ${json.lastName}`;

ezt meg külön kell ezért kell egy firstNameHolder meg egy lastNameHolder, amit megadunk a class-nak mezőnek

class Users {
    itt van a többi mező, amit lementettünk a constructor-ban, meg akkor ide írjuk a firstNameHolder-t meg a lastNameHolder-t
    firstNameHolder;
    lastNameHolder;

    constructor() {
        többi dolog, ami le volt mentve 
        this.firstNameHolder = document.querySelector("#first-name");
        this.lastNameHolder = document.querySelector("#last-name");
    }
}

a getUser-ben pedig ugyanugy, mint a többinek értéket adunk. szóval ehelyett
this.nameHolder.innerText = `${json.firstName} ${json.lastName}`;
->
this.firstNameHolder.value = json.firstName;
this.lastNameHolder.value = json.lastName;

csinálunk ezek a mezők alatt egy update button-t
->
<button id="update-user">Update</button>

és ugyanoda, a class-nak megadjuk mezőnek ezt a updateUserBtn-t, mondjuk a lastNameHolder alá 
    firstNameHolder;
    lastNameHolder;
    updateUserBtn;

és ugyanugy lementjük a constructor-ben
->
    constructor() {
        többi dolog, ami le volt mentve 
        this.firstNameHolder = document.querySelector("#first-name");
        this.lastNameHolder = document.querySelector("#last-name");
        this.updateUserBtn = document.querySelector("#update-user");
    }

a getUser alá csinálunk egy async updateUser metódust (ez majd várni fog egy user objektumot!!!!!!!! amiben megadjuk az új adatokat)
-> 
async updateUser(user, id) {
    try {
        const response = await fetch("https://dummyjson.com/users/" + id, {
            method: "PUT",
            body: JSON.stringify(user);
            headers:{"Content-Type":"application/json"}
        });

        const json = await response.json();

        if(response.ok) {
            alert("Sikeres felülírás");
        } else {
            alert("A felülírás sikertelen volt");
        }
    } catch(err) {
        console.log(err);
    }
}

Tehát itt felül szeretnénk írni, ezért kell a method: put, body-ban csinálunk majd egy objektumot, aminek a neve user lesz 
és majd itt megadjuk neki az adatokat, amiket szeretnénk, de ezt úgy, hogy a majd az input mezőkbe írjuk be ezeket!!!!

csinálunk még egy függvényt ezalá 
->
async updateUserClick() {

}

és akkor ez azért jó nekünk, mert így külön kezeljük az updateUser-t meg az eventListener-t
updateUserClick-ben pedig összedszedjük az adatokat, megcsináljuk ezt a user objektumot 
->
async updateUserClick() {
    const user = {
        firstName:this.firstNameHolder.value.trim();
        lastName:this.lastNameHolder.value.trim();
        birthDate:this.birthDateHolder.value;
        age:this.parseInt(ageHolder.value);
        email:this.emailHolder.value.trim();
        address:this.addressHolder.value.trim();
    }
}

Tehát itt megadtuk az input mezőknek, amiket ugye lementettünk pl. ageHolder, azoknak a value-ja lesz az érték ebben a user objektumban 
hol kell használni .this-t a class-on belül (constructor, netódusok, eventListener)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Kellene nekünk egy user-id
Az a kérdés, hogy ezt a user-id-t ezt hogyan fogjuk leszedni
-> 
127.0.0.1:5500/user.html?id=8
ez kell nekünk innen -> id=8

Úgy tudjuk megcsinálni, hogy van nekünk ez a urlObj az index.js-n és ezt itt is be tudjuk hívni(legfelül import)
import urlObj from "./url.js";
és akkor innen ki tudjuk venni 

most ide a updateUserClick-ben pedig meghívjuk a updateUser függvényt és megadjuk neki a user-t amit itt elkésí

*/
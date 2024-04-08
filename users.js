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

most ide a updateUserClick-ben pedig meghívjuk a updateUser függvényt és megadjuk neki a user-t amit itt elkészítettünk és még
adunk neki egy id-t is, ami a urlObj-ből jön, urlObj.id, de minedezt egy eventListener-ben, amit a updateUserBtn-nek adtuk meg 
->
this.updateUser(user, urlObj.id);

this.updateUserBtn.addEventListener("click", ()=> {
    this.updateUser(user, urlObj.id);
});

Szóval itt meghívjuk az updateUser-t ebben a updateUserClick-ben, majd az egész updateUserClick-et pedig a class Users constructor-ában 
-> 
így néz ki most a class constructor-a meg az class Users a getUsers-t kivéve 
class Users {
    userHolder;
    firstNameHolder;
    lastNameHolder;
    birthDateHolder;
    ageHolder;
    emailHolder;
    addressHolder;
    userImgHolder;
    updateUserBtn;

    constructor() {
        this.usersHolder = document.querySelector("#users-holder");
        this.firstNameHolder = document.querySelector("#first-name");
        this.lastNameHolder = document.querySelector("#last-name");
        this.birthDateHolder = document.querySelector("#birth-date");
        this.ageHolder = document.querySelector("age");
        this.emailHolder = document.querySelector("#email");
        this.addressHolder = document.querySelector("#address");
        this.userImgHolder = document.querySelector(#user-image);
        this.updateUserBtn = document.querySelector(#update-user);

        this.updateUserClick();

    async updateUser(user, id) {
        try {
            const response = await fetch("https://dummyjson.com/users/ + id", {
                method:"PUT",
                body:JSON.stringify(user),
                headers:{"content-type":"application/json"}
            });

            const json = await response.json();
            console.log(json);

            if(response.ok){
                alert("Sikeres felülírás");
            } else {
                alert("A felülírás sikertelen volt");
            }
        } catch(err) {
            console.log(err);
        }
    }

    async updateUserClick() {

        thisupdateUserBtn.addEventListener("click", ()=> {

        const user = {
            firstName:this.firstNameHolder.value.trim(), 
            lastName:this.lastNameHolder.value.trim(),
            birthDate:this.birthDateHolder.value,
            age:parseInt(this.ageHolder.value),
            email:this.emailHOlder.value.trim(),
            address:this.addressHolder.value.trim()
        };

        console.log(user);

            this.updateUser(user, urlObj.query.id);

            console.log(urlObj);
        });
    }
}

console.log(urlObj);

{...}
    getBaseUrl: f getBaseUrl()
    host: "127.0.0.1"
    path: "/user.html"
    port: "5500"
    protocol: "http:"
    query: {id:'8'}
    [[prototype]]: Object

ez van beírva url-nek a böngészőben most -> 127.0.0.1:5500/user.html?id=8

most azzokkal az adatokkal, amik alapból be voltak írva megnyomtuk a felülírás update gombot 

Kaptunk egy közlendőt az alert-re, amit csináltunk, hogy Sikeres felülírás 

console.log(json)
-> 
{...}
    address{address: '5601 West Crocus Drive', city: 'Glendale'}
    age: 29
    bank: {cardExpire: '', cardNumber: '', cardType: ''}
    birthDate: "1964-08-24"
    bloodGroup: "A-"
    email: "ggude7@chrone.com"
    eyeColor: "blue"
    gender: "male"
    hair: {color: '', type: ''}
    height: 146
    id: 8 
    lastName: "Mueller"
    stb...
**************************************************************************************************************************************
Mi az amit még itt meg lehetne csinálni 
-> 
Ellenőrizhetnénk az adatok formátumát 

Tehát ha megnézzük itt a user objektumot 
console.log(user)
{...}
    address"Glendale, 5601 West Crocus Drive"
    age: 29
    birthDate: "1964-08-24"
    email: "ggude7@chrone.com"
    fistName: "Ewell"
    lastName: "Mueller"
    [[Prototype]]: Object

************************************************************************************************************************************
regex.js

csinálunk a updateUserClick felé egy checkInputs nevű metódust, ahol bekérünk egy user-t!!!!! 
checkInputs(user) {
    const errors = [];

    if(user.firstName.length === 0)
        errors.push("A keresztnév mező nem maradhat üres!");
    if(user.lastName.length === 0)
        errors.push("A vezetéknév mező nem maradhat üres!")
    if(!/^[\d]{4}\-[\d]{2}\-[\d]{2}$/.test(user.birthDate))
        errors.push("a dátum mező formátuma nem megfelelő!")
    if(!/^([\w\.\-\_]{0-255})\@([\w\.\-\_]{0-255})\.([\w]{2,})$/).test(user.email)
        errors.psuh("Az email cím formátuma nem megfelelő")
    return errors; vagy throw errors;
}

ezzel le tudjuk ellenőrozni a birthdate-et -> [\d]{4}\-[\d]{2}\-[\d]{2}
ez egy valid színtaktika így /[\d]{4}\-[\d]{2}\-[\d]{2}/ -> ez egy regex objektum 
Ha azt akarjuk, hogy egymás után ne fogadjon el több valid email címet, csak eggyet, 
akkor az elejére rakunk egy ^ végére meg egy $!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
->
/^[\d]{4}\-[\d]{2}\-[\d]{2}$/
és ennek van egy test-je!!!!!!.test()
()-be meg be kell írni, hogy mit szeretnénk ellenőrizni 
->
/^[\d]{4}\-[\d]{2}\-[\d]{2}$/.test(user.birthDate)
és a legvégén meg kell egy !, szóval, ha ez nem így van, akkor kell nekünk egy hibaüzenetet küldenünk 
-> 
if(!/^[\d]{4}\-[\d]{2}\-[\d]{2}$/.test(user.birthDate))

email címnél pedig így fog kinézni
->
if(!/^([\w\.\-\_]{0-255})\@([\w\.\-\_]{0-255})\.([\w]{2,})$/).test(user.email)

fontos dolgok
->
1. ! kell a tagadás 
2. // kell belerakni az egészet 
3. ^$ elejére meg a végére kellenek ezeket, hogy csak egyszer tudjuk helyesen beírni 
4. .test() és akkor oda, hogy mit szeretnénk vele ellenőrizni -> pl. .test(user.email)

Ha ezeket így szépen megcsináltuk, akkor két lehetőségünk van 
1. return errors;
2. throw errors; (amit majd egy try-catch blokkban el kell kapnunk)
és fontos, hogy csak akkor dobjunk error-t, ha van a errors-ban valami -> errors.length > 0 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

checkInputs(user) {
    const errors = [];

    if(user.firstName.length === 0)
        errors.push("A keresztnév mező nem maradhat üres!");
    if(user.lastName.length === 0)
        errors.push("A vezetéknév mező nem maradhat üres!")
    if(!/^[\d]{4}\-[\d]{2}\-[\d]{2}$/.test(user.birthDate))
        errors.push("A dátum mező formátuma nem megfelelő!")
    if(!/^([\w\.\-\_]{0-255})\@([\w\.\-\_]{0-255})\.([\w]{2,})$/).test(user.email)
        errors.psuh("Az email cím formátuma nem megfelelő")
    
    if(errors.length > 0)
        throw errors;
}

az updateUser-nél meghívjuk a this.checkInputs(user) a try-blokkban!!!
catch blokkban pedig 
if(Array.isArray(err)) {
    alert(err.join("\n"));
}
azért kellett ez az isArray-es dolog, mert ez a catch ág sokféle error-t el tud kapni, de a mi errorjaink egy array-ben vannak 
és az szeretnénk, hogy csak azokat a hibákat írja ki!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
a \n meg azt csinálja, hogy nem egymás mellett lesznek hanem egymás alatt 
\n -> newline 
join -> a tömböknek az elemeit összefüzzük egy határolókarakter mentén és itt ez a \n, tehát a sortörés 
azért, mert az alert az úgy müködik mint egy plain text file, egy sima text file ebben az esetben, tehát nem a br a sortörés 
hanem a \n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    async updateUser(user, id) {
        try {
            this.checkInput(user) !!!!!!!
            const response = await fetch("https://dummyjson.com/users/ + id", {
                method:"PUT",
                body:JSON.stringify(user),
                headers:{"content-type":"application/json"}
            });

            const json = await response.json();
            console.log(json);

            if(response.ok){
                alert("Sikeres felülírás");
            } else {
                alert("A felülírás sikertelen volt");
            }
        } catch(err) {
            console.log(err);
            if(Array.isArray(err)) { !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                alert(err.join("\n"));
            }
        }
    }

és ha most van valami hibánk akkor lejön egy alert-ben a hibaüzenetek egymás alatt lesznek
-> 
A dátum mező formátuma nem megfelelő!
Az email cím formátuma nem megfelelő

mivel a constructor-ban hoztuk létre ezt az eventListener-t 
->
itt van meghívva a updateUserClick, amiben van egy eventListener is 
És contructor az nem csak akkor fut le amikor nem a .html?id=8 oldalakon vagyunk, ahol az adatokat megjelenítjük hanem 
a főoldalon is lefut, mert ott is példányosítva van 

Ezért az async updateUserClick.ben azt írjuk, hogyha a updateUserBtn === null akkor return 
ezzel azt csináltunk, hogyha a button létezik csak akkor fusson le, tehát ha azon az oldalon vagyunk ahol van a button 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-> 
    async updateUserClick() {
        if(this.updateUserBtn === null)
            return;

        thisupdateUserBtn.addEventListener("click", ()=> {
        const user = {
            firstName:this.firstNameHolder.value.trim(), 
            lastName:this.lastNameHolder.value.trim(),
            birthDate:this.birthDateHolder.value,
            age:parseInt(this.ageHolder.value),
            email:this.emailHOlder.value.trim(),
            address:this.addressHolder.value.trim()
        };

        console.log(user);

            this.updateUser(user, urlObj.query.id);

            console.log(urlObj);
        });
    }
}
******************************************************************************************************************************
Fontos!!!!!!!!!!!!!!
Megnézzük, hogy lehet lapozni 
ehhez kell egy page és egy maxPage!!!! 
class Users {
    userHolder;
    firstNameHolder;
    lastNameHolder;
    birthDateHolder;
    ageHolder;
    emailHolder;
    addressHolder;
    userImgHolder;
    updateUserBtn;
    page;
    maxPage;
    nextBtn;
    prevBtn;
    pageH4;

    constructor() {
        this.usersHolder = document.querySelector("#users-holder");
        this.firstNameHolder = document.querySelector("#first-name");
        this.lastNameHolder = document.querySelector("#last-name");
        this.birthDateHolder = document.querySelector("#birth-date");
        this.ageHolder = document.querySelector("age");
        this.emailHolder = document.querySelector("#email");
        this.addressHolder = document.querySelector("#address");
        this.userImgHolder = document.querySelector(#user-image);
        this.updateUserBtn = document.querySelector(#update-user);
        this.page = 1;
        this.maxPage = 0;
        this.prevBtn = document.querySelector("prev");
        this.nextBtn = document.querySelector("next");
        this.pageH4 = document.querySelector("page");
        this.nextBtn();
        this.prevBtn();

        this.updateUserClick();

page az eggyel fog kezdödni, a maxPage pedig itt még nullával fog kezdőni!!!!!
de amikor a getUsers-vel leszedjük az adatokat, akkor ott a json 
console.log(json);
{user: Array(30)...}
    limit: 30
    skip: 0 
    total: 100
    users: (30) [{...}, {...}, {...}]

itt van ez a total-os dolog és maxPage az egyenlő lesz ezzel 
this.maxPage = json.total;

megcsináljuk a html szerkezetet 
lesznek majd html entity-t -> &lt; meg a &gt; ez az előre meg hátra mutató nyilak!!!!! << >> 
ezzekkel a html entity-kkel speciaális karaktereket lehet így kiírni 
-> 
    <div class="pagination">
        <div>
            <button id="prev">&lt;</button>
        </div>
        <div>
            <h4 id="page">1/10</h4>
        </div>
        <div>
            <button id="next">&lt;</button>
        </div>
    </div>

    .pagination {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-width: 300px;
    margin: 15px auto;
}

és akkor még ezeket a dolgokat, amiket itt csináltunk id-vel, azokat lementjük, kicsit fölötte van a constructor oda írom ezeket 
le vannak mentve querySelector-vel, mindegyik button meg a h4-es is 

így néz ki a limit and skip products a dummyjson-on 
->
fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
.then(res => res.json())
.then(console.log);

most a getUsers-ben megcsináljuk a limit-et meg a skip-et 
Skip-nek lesz a nagy szerepe, mert az az lesz, hogy this.page-1 szorozva a limittel, ami itt jelen esetben 24

async getUsers() {
    try {
        const skip = (this.page-1) * 24;
        const response = await fetch("https://dummyjson.com/users?limit=24"&skip=" + skip);
        const json = response.json();
        this.maxPage = json.total;
    }
}

legalul csinálunk egy next-et 
next() {
    this.nextBtn.addEventListener("click", ()=> {
        if(this.nextBtn === null)
            return;
        this.page++;
        this.getUsers();
    });
}
Meg kell hívni a getUsers-et, mert ott csináltuk meg a page változó nővekedjen eggyel 
Fontos, hogy itt majd ellenőrizni kell azt, hogy nem léptünk túl a megadott kereteken, tehát nem akarunk több terméket leszedni, mint ami 
létezik 
ezt a next-et majd meghívjuk a constructor-ban és itt is vigyázni kell arra, hogyha ez a nextBtn az null akkor return!!!!

most betöltött még ugyanannyit, de mi nem ezt szeretnénk, hanem hogy lapozzon, ezért 
-> 
if(response.ok) 
    this.userHolder.innerHTML = "";

megcsináljuk a prevBtn-t is 
prev() {
    this.prevBtn.addEventListener("click", ()=> {
        if(this.prevBtn === null)
            return;
        this.page--;
        this.getUsers();
    });
}
Itt még be tud menni minuszba meg nem mutatja, hogy hányadik oldalon vagyunk!!!
*/

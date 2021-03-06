# Hópverkefni 2

Þetta verkefni fólst í því að smíða prótótýpu af fyrirlestravef fyrir vefforritun 1. Gefin voru gögn sem voru unnin uppúr námsefni vetrarins. 

## Síður

Allur html kóði fyrir utan haus og filter-takka á forsíðu er búinn til með JavaScript með AJAX-kalli í `lectures.json`. 

List.js heldur utan um kóða fyrir forsíðu og lecture.js heldur utan um kóða fyrir fyrirlestrasíður. Við bættum einnig við storage.js sem heldur utan um virkni fyrir localStorage. Auk þess erum við með index.js sem sér um keyrslu síðunnar og virkni takka og helpers.js heldur utan um hjálparföll. 

List.js, lecture.js, storage.js og helpers.js er að finna í `src` undir `lib` og index.js er í rót verkefnisins. 

Allar myndir sem eru á síðunni eru undir möppunni 'img'.

Við skrifuðum allt .scss eina scss skrá sem heldur utan um útlit fyrir forsíðu og fyrirlestrasíður og config.scss heldur utan um breytur sem við notum mikið í scss-inu. 

Allur scss kóðinn þýðist svo yfir í styles.css við keyrslu.

## Tæki og tól

Eftirfarandi var sett upp í verkefni:

* `.stylelintrc` með upplýsingum um hvernig stylelint eigi að haga sér. Síðan settum við upp `stylelint-config-primer` pakkann til að vera með viðmið til að vinna eftir. 
* `.eslintrc` skrá sem segir til um hvernig lint fyrir JavaScript skrár skuli háttað
* `.gitignore` sem hunsar algengar skrár, [sjá nánar](https://help.github.com/ignore-files/)
  - Allt undir `./dist` hunsað sem þýðir að það verður _ekki_ checkað inn. Það er gert vegna þess að þær skrár eru útbúnar af tólum þegar verkefni er keyrt.
* `.gitattributes` sem kemur í veg fyrir ósamræmi sem geta komið upp þegar unnið er á milli stýrikerfa
* `.editorconfig` sem samræmir notkun á tabs og spaces, bilum [og fleira](https://editorconfig.org/)
* `grid.css` sem við notuðum til þess að stíla verkefnið okkar eftir.
* `package.json` var uppsett script ásamt eftirfarandi dependencies
  - `eslint` til að keyra eslint
  - `stylelint` til að keyra stylelint
  - `test` til að keyra bæði `eslint` og `stylelint`
  - `browser-sync` til að keyra verkefni, bæta þarf við skrám sem vaktaðar eru
  - `sass` til að keyra fyrstu þýðingu
  - `sass-watch` til að fylgjast með sass skrám og þýða
  - `dev` til að keyra `sass` og `browser-sync`

Við bættum síðan við 

* `rollup` til að pakka saman JavaScript kóða
* `babel` til að _transpila_ kóða

sem við bættum við í tólin hér fyrir ofan. Við erum að keyra rollup og babel með browser-sync með skipuninni `npm run dev`.

Til að keyra verkefni keyrist rétt þarf að keyra `broswer-sync` með `npm run dev` auk annarra script-a í `package.json`. 

## Hópavinna

Þetta verkefni var unnið af Ylfu Hafsteinsdóttur `ylh1@hi.is` og Hörpu Dögg Hafsteinsdóttur `hdh20@hi.is`.

Það hefði ekki verið verra að hafa þriðju manneskjuna með í verkefninu til að deila álaginu en við erum samt nokkuð ánægðar með hvernig þetta kom út. 

## Slóð á verkefni

Á eftirfarandi slóð má finna keyrslu á verkefninu: [Slóð á verkefnið](https://notendur.hi.is/~ylh1/vefforritun/h2)

## Annað

Við lögðum mjög hart að okkur við vinnsluna á þessu verkefni og erum mjög glaðar að hafa komið því nokkuð þokkalega saman. Það hefði verið ágætt að hafa aðeins meiri tíma til að fínpússa css-ið örlítið en það er samt í heildina litið alveg ágætt. 

Það virðist vera smá böggur (er stundum til staðar og stundum ekki) þegar maður bætir eða tekur `slug` fyrirlesturs út úr localStorage. Stundum þarf að ýta nokkrum sinnum á takkann til að hann haldist inni. Annars birtist hann í augnablik inni í loacalStorage og hverfur svo. Við skoðuðum þetta í lengri tíma þ.á.m. með hjálp dæmatímakennara sem skildi ekki heldur hvers vegna þetta var að gerast. Ath. böggurinn var ekki til staðar þegar verkefninu er skilað. 

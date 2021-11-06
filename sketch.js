

var historia,hist,estado,playI;
estado= 0;
hist=1;
var estadoPadre ;
estadoPadre = 1;

var chica, chicaI, chicaM;
var zombie, zombieI, zombieG; 
var arbol, arbolI, rama, ramaI;
var flecha, flechaI; 
var fondo, fondoI, perdiste, perdisteI;
var state;

var sueloI;
var ramaG, flechaG, arbolG; 
var cuadrosF, cuadrosA, cuadrosR;
var play13;
  
function preload()
{

    playI = loadImage ("play.jpg");

    chicaI = loadAnimation ("chica corriendo .gif");
    chicaM = loadImage ("chicamuerta.jpg");
    zombieI = loadAnimation ("zombie bueno corriendo.gif");
    arbolI = loadImage ("arbol.png");
    ramaI = loadImage ("rama.png");
    flechaI =loadImage ("flecha verde .png");
    fondoI = loadImage ("fondo funciona.png");
    zombieG = loadImage ("zombieGane.jpg");
    perdisteI = loadAnimation ("perdiste.gif");
}

function setup()
{
        createCanvas(935, 400);

  perdiste = createSprite (0, 0);
  perdiste.addAnimation ("perdi", perdisteI);

        
        fondo = createSprite (0, 0);
        fondo.addImage (fondoI);
        fondo.scale = 2.7;

        chica = createSprite (450, 360);
        chica.addAnimation ("corriendo", chicaI);
        chica.addAnimation ("muerta", chicaM);
        chica.scale = 0.5;

        zombie = createSprite (70, 280);
        zombie.addAnimation ("corriendo", zombieI);
        zombie.addAnimation ("gane", zombieG)
        zombie.scale = 0.4;
        zombie.setCollider ("rectangle", 0,90, 300,400);

        ramaG = createGroup ();
        flechaG = createGroup ();
        arbolG = createGroup ();

        sueloI = createSprite (467, 400, 935, 5);
        sueloI.visible = false; 
}

function draw()
{
    background(0);
    
             perdiste.visible = false;

             fondo.velocityX = -7;
              if (fondo.x < 0)
            {
             fondo.x = fondo.width/2;
            }
          

            if (keyDown("space") && chica.y >= 360)
              {
                 chica.velocityY = -15;
              }
                 chica.velocityY = chica.velocityY + 0.8;
                  // chica.collide (sueloI);    

                  
                  ramas ();
                  arboles ();
                  flechas ();

              if (ramaG.isTouching (chica))
              {
                  chica.changeAnimation ("muerta", chicaM);
                  chica.x = chica.x - 2;
              }
              else
              {
                 chica.changeAnimation ("corriendo", chicaI);
              }
              if (chica.isTouching (flechaG))
              {
                    chica.x = chica.x + 8; 
              }
        
              if (arbolG.isTouching(chica))
              {
                 state = 0;
              }
              if (zombie.isTouching (chica))
              {
                  state = 0;
              }
         
            if (state === 0)  
            {
                  perdiste = createSprite ( width/2, height/2);
                  perdiste.addAnimation ("perdi", perdisteI);
                  perdiste.scale = 1.6;
                  perdiste.visible = true;
                  fondo.visible = false;
                  perdiste.depth = chica.depth;
                  chica.depth = chica.depth+1;
                  perdiste.depth = zombie.depth;
                  zombie.depth = zombie.depth + 1;
                  chica.changeAnimation ("muerta", chicaM);
                  zombie.changeAnimation ("gane", zombieG);
                  ramaG.destroyEach();
                  arbolG.destroyEach();
                  flechaG.destroyEach ();

                  if (mousePressedOver (perdiste))
                  {
                      reset();
                  }
              
            }
            if ( chica.x >= 800 && estadoPadre === 2)
            {
              state = 2;
              chica.visible = false ;
              fondo.visible = false;
              zombie.visible = false;
              historia.visible = false;
              flechaG.destroyEach ();
              chica.velocityX=0;
              estado = 14; 
              estadoPadre =3;
            }  
           if (estadoPadre === 3)
          {
             chica.x=450;
              historia2();
         }         

chica.collide (sueloI);
//console.log  (chica.x);
drawSprites(); 
}

function reset ()
{
    state = 1;
    perdiste.visible = false;
    fondo.visible = true;
    chica.changeAnimation ("corriendo", chicaI);
    zombie.changeAnimation ("corriendo", zombieI);
    puntaje = 0;

}
  
  function ramas()
  {
    if ( frameCount % 100 === 0 || frameCount % 200 === 0 )
    {
          rama = createSprite (width, height-25);
          rama.addImage (ramaI);
          rama.velocityX = -10;           
          rama.setCollider ("rectangle",-13,0, 400, 150);
          rama.scale = 0.2; 
          rama.lifetime = 95;   
          chica.depth = rama.depth;
          rama.depth = rama.depth + 1;  
          ramaG.add (rama);

    }
   
  }
  
  function arboles ()
  {
  //  cuadrosA = Math.round(random(0, 1000));
         if ( frameCount % 150  === 0 || frameCount % 250  === 0 || frameCount % 300  === 0   )
         {
              arbol = createSprite (width, height-55);
              arbol.addImage (arbolI);
              arbol.scale = 0.2;
              arbol.velocityX = -10; 
              arbol.lifetime = 95;
              arbolG.add (arbol);
              arbol.setCollider ("circle", 0,0,200);
          }
  }
  
  function flechas ()
  {
    if ( frameCount % 525 === 0 )
      {
            flecha = createSprite (width, height-30);
            flecha.addImage (flechaI);
            flecha.scale = 0.08;
            flecha.velocityX = -10;
            flecha.lifetime = 95;
            chica.depth = flecha.depth;
            flecha.depth = flecha.depth + 1;
            flechaG.add (flecha);
            flecha.setCollider ("circle",0,0,400);
      }
  }
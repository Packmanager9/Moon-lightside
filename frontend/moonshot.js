// moonshot

let timer1 = 0
let landed = 0
let maxspeed = 3.5
let takeoff = 0
//let rocketarray[0].xacc = 0

// let rocketarray[0].yacc = 0

let fuel = 500
let healthstat = 100000


window.addEventListener('DOMContentLoaded', (event) =>{

    let eaten = document.getElementById("eaten");
    let momentum = document.getElementById("momentum");
    eaten.innerText = "0"
    let health = document.getElementById("health");
    health.innerText = `${healthstat}`
    momentum.innerText = "0"
    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background =  "#000000"

    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, mass = 1, xacc = 0, yacc = 0) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.mass = mass
            this.xacc = xacc
            this.yacc = yacc
        }
        draw(context){
            context.lineWidth =22;
            context.strokeStyle = this.color
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            context.stroke();
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom

        }
        stop(){
            this.xmom = 0
            this.xacc = 0
            this.ymom = 0
            this.yacc = 0
        }
    }

    class Rectangle {
        constructor(top, left, width, height, color) {
            this.top = top
            this.left = left
            this.width = width
            this.height = height
            this.color = color
        }
        draw(context){
            context.fillStyle = this.color
            context.fillRect(this.left, this.top, this.width, this.height)
        }
    }



    document.onkeydown = function(event) {

        
        switch (event.keyCode) {
           case 65:  
           takeoff = 0
           landed = 0
           if(fuel > 0){
           rocketarray[0].xmom -= 3000/rocketarray[0].mass
           fuel--
           }
              break;
           case 87:
                takeoff = 0
                landed = 0
                if(fuel > 0){
                rocketarray[0].ymom -= 3000/rocketarray[0].mass
                fuel--
                }
              break;
           case 68 :

                takeoff = 0
                landed = 0
                if(fuel > 0){
                rocketarray[0].xmom += 3000/rocketarray[0].mass
                fuel--
                }
              break;
              case 83:
                
                    takeoff = 0
                    landed = 0
           if(fuel > 0){
                    rocketarray[0].ymom += 3000/rocketarray[0].mass
                    fuel--
                    }
                 break;
                 case 32:
      // spacebar
      rocketarray[0].mass += 100
      rocketarray[0].radius += .2
                    break;
        }
    };


    let rocket = new Circle(2500, 1000, 5, "#FF0000", 0, 0, 1000 )
   let   rocketarray = [rocket]
   let planets = []
   let moon = new Circle(4000, 1000, 100, "#FFFFFF", 0, 0, 100000 )
   let earth = new Circle(1000, 1000, 150, "#0000FF", 0, 0, 100000 )


   let asteroids = []
   for(let h = 0; h < 20; h++){

    let basicstat = (Math.random()*12)+2.5
    let a1 = new Circle((Math.random()*tutorial_canvas.width), Math.random()*tutorial_canvas.height, basicstat, "#DDAA00", 0, 0, basicstat*20 )

   planets.push(a1)

   asteroids.push(a1)
   }


//    asteroids.push(earth)
//    asteroids.push(moon)
   planets.push(earth)
   
  planets.push(moon) 


window.setInterval(function(){ 


    eaten.innerText = `${fuel}`

    tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)

    for(let w = 0; w < planets.length; w++){
        for(let g = 0; g < asteroids.length; g++){

            let masses = 0
        
            if(planets[w] !== asteroids[g]){
         masses = planets[w].mass*asteroids[g].mass
         
        let distance = Math.abs(Math.abs(planets[w].x) - Math.abs(asteroids[g].x))
        let distancey = Math.abs(Math.abs(planets[w].y) - Math.abs(asteroids[g].y))

        let hypotenuse = Math.sqrt((distancey*distancey)+(distance*distance))

        //console.log(hypotenuse)
        let squaredisy = hypotenuse*hypotenuse/2
        let squaredis = hypotenuse*hypotenuse/2
        let forcevec = (masses/squaredis) 
        let forcevecy = (masses/squaredisy)

        forcevec /= 1
        forcevecy /= 1


        if(Math.abs(forcevec) > 20){
            forcevec = 20

        }
        if(Math.abs(forcevecy) > 20){
            forcevecy = 20

        }

        if(asteroids[g].yacc > 20){
            asteroids[g].yacc = 20
        }
        if(asteroids[g].yacc < -20){
            asteroids[g].yacc = -20
        }
        if(asteroids[g].xacc  > 20){
            asteroids[g].xacc  = 20
        }
        if(asteroids[g].xacc  < -20){
            asteroids[g].xacc  = -20
        }

        if(asteroids[g].x < planets[w].x){
            asteroids[g].xacc += forcevec
            }else{
                asteroids[g].xacc  += 0-forcevec
            }
            if(asteroids[g].y < planets[w].y){
                asteroids[g].yacc  += forcevecy
            }else{
                asteroids[g].yacc += 0-forcevecy
            }

            asteroids[g].xmom += asteroids[g].xacc/70000
            asteroids[g].ymom += asteroids[g].yacc/70000


            if(asteroids[g].xmom  > .433){
                asteroids[g].xmom  = .433
            }
            if(asteroids[g].xmom  < -.433){
                asteroids[g].xmom  = -.433
            }
            if(asteroids[g].ymom  > .433){
                asteroids[g].ymom  = .433
            }
            if(asteroids[g].ymom  < -.433){
                asteroids[g].ymom  = -.433
            }


            if(landed == 0){
            asteroids[g].move()
            }

            if(asteroids[g].x < 0){
                asteroids[g].x = tutorial_canvas.width

            }
            
            if(asteroids[g].x > tutorial_canvas.width){
                asteroids[g].x = 0

            }
            if(asteroids[g].y < 0){
                asteroids[g].y = tutorial_canvas.height

            }
            
            if(asteroids[g].y > tutorial_canvas.height){
                asteroids[g].y = 0

            }


    if(((rocketarray[0].x-rocketarray[0].radius)  < (asteroids[g].x + asteroids[g].radius) && ((rocketarray[0].x+rocketarray[0].radius) > (asteroids[g].x - asteroids[g].radius)) && ((rocketarray[0].y+rocketarray[0].radius)  > (asteroids[g].y - asteroids[g].radius))&&((rocketarray[0].y-rocketarray[0].radius)  < (asteroids[g].y + asteroids[g].radius)))){
      let damage = asteroids[g].mass*(Math.abs(asteroids[g].xmom)+Math.abs(asteroids[g].ymom))
      asteroids[g].xmom *= -1 
       asteroids[g].ymom *= -1

      if(damage > 12000){
        healthstat -= 12000
      }else{
        healthstat  -= damage
      }

    // let audio = new Audio('bleep.wav');

    // if (audio.duration > 0 && !audio.paused) {

    //     //Its playing...do your job
    
    // } else {
    //    // audio.play();
    // }
  
      }
        }else{
           
               }
        }



        
     //   planets[w].x += (Math.random()*10)-5
        
     //   planets[w].y += (Math.random()*10)-5



        
        let masses = planets[w].mass*rocketarray[0].mass
        let distance = Math.abs(Math.abs(planets[w].x) - Math.abs(rocketarray[0].x))
        let distancey = Math.abs(Math.abs(planets[w].y) - Math.abs(rocketarray[0].y))

        let hypotenuse = Math.sqrt((distancey*distancey)+(distance*distance))

       // console.log(hypotenuse)
        let squaredisy = hypotenuse*hypotenuse/1.41
        let squaredis = hypotenuse*hypotenuse/1.41
        let forcevec = (masses/squaredis) 
        let forcevecy = (masses/squaredisy)

        forcevec /= 1
        forcevecy /= 1


        if(Math.abs(forcevec) > 100){
            forcevec = 100

        }
        if(Math.abs(forcevecy) > 100){
            forcevecy = 100

        }

        if(rocketarray[0].yacc > 100){
            rocketarray[0].yacc = 100
        }
        if(rocketarray[0].yacc < -100){
            rocketarray[0].yacc = -100
        }
        if(rocketarray[0].xacc > 100){
            rocketarray[0].xacc = 100
        }
        if(rocketarray[0].xacc < -100){
            rocketarray[0].xacc = -100
        }

        if(rocketarray[0].x < planets[w].x){
            rocketarray[0].xacc += forcevec*3
            }else{
                rocketarray[0].xacc += 0-forcevec*3
            }
            if(rocketarray[0].y < planets[w].y){
            rocketarray[0].yacc += forcevecy*3
            }else{
                rocketarray[0].yacc += 0-forcevecy*3
            }
        
    planets[w].draw(tutorial_canvas_context)

}


    rocketarray[0].xmom += rocketarray[0].xacc/3700
    rocketarray[0].ymom += rocketarray[0].yacc/3700


    if(rocketarray[0].xmom  > 5){
        rocketarray[0].xmom  = 5
    }
    if(rocketarray[0].xmom  < -5){
        rocketarray[0].xmom  = -5
    }
    if(rocketarray[0].ymom  > 5){
        rocketarray[0].ymom  = 5
    }
    if(rocketarray[0].ymom  < -5){
        rocketarray[0].ymom  = -5
    }

    //console.log( rocketarray[0].xmom , rocketarray[0].ymom)

    if(landed == 0 && takeoff == 0){
    rocketarray[0].move()
    momentum.innerText = Math.round(Math.abs(rocketarray[0].ymom) + Math.abs(rocketarray[0].xmom)) + ''
    } else{
        rocketarray[0].stop()

    }
    
    if(((rocketarray[0].x-rocketarray[0].radius)  < (earth.x + earth.radius) && ((rocketarray[0].x+rocketarray[0].radius) > (earth.x - earth.radius)) && ((rocketarray[0].y+rocketarray[0].radius)  > (earth.y - earth.radius))&&((rocketarray[0].y-rocketarray[0].radius)  < (earth.y + earth.radius)))){
        fuel = 1000
        landed =1
        takeoff= 1
      }else if(((rocketarray[0].x-rocketarray[0].radius)  < (moon.x + moon.radius) && ((rocketarray[0].x+rocketarray[0].radius) > (moon.x - moon.radius)) && ((rocketarray[0].y+rocketarray[0].radius)  > (moon.y - moon.radius))&&((rocketarray[0].y-rocketarray[0].radius)  < (moon.y + moon.radius)))){

       fuel = 1000
        landed =1
        takeoff= 1
      }else {
        takeoff = 0
                 landed = 0
      }
    rocketarray[0].draw(tutorial_canvas_context)

    if(rocket.x > tutorial_canvas.width){
     //   rocketarray = []
        
    }
    if(rocket.y > tutorial_canvas.height){
    //    rocketarray = []
        
    }
    if(rocket.x < 0){
   //     rocketarray = []
        
    }
    if(rocket.y < 0){
    //   rocketarray = []
        
    }
 if(healthstat <= 0){
      fuel = 0
      healthstat = 0

    }

    health.innerText = `${Math.ceil(healthstat/1000)}`
   

    if(landed == 1){

    }else{
        if((timer1%1000) < 500 ){
            moon.y +=1
            earth.x -=1
    
        }else{
            moon.y -=1
            earth.x +=1
    
        }
        if((timer1%488) < 244 ){
            moon.x +=1
    
            earth.y -=1
        }else{
            moon.x -=1
    
            earth.y +=1
        }
}



    timer1++
}, 12)


})
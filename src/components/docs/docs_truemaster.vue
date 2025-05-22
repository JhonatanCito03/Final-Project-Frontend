<template> 
<VueLenis root>
  <div class="container">
    <div class="rotate">
      <div class="cubo">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p style="margin-top: -30px; font-size: 15px;">cargando...</p>
      <div class="truemaster">
        <hr>
        <h1>TrueMaster</h1>
        <hr>
      </div>
        <p>
          TRUEMASTER es una plataforma integral de productividad, aprendizaje y creación digital, diseñada para ayudarte a alcanzar tu máximo potencial.
        </p>
    </div>
  </div>
</VueLenis>
</template>

<script>
import { watch } from 'vue'
import {CaretTop} from '@element-plus/icons-vue'

export default {
  name:'about_'
}

</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rotate {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cubo {
margin-top: 100px;
  position: relative;
  height: 200px;
  transform-style: preserve-3d;
  animation: rotar 8s linear infinite;
  margin-bottom: -60px;
}

.cubo > span {
  position: absolute;
  width: 4em;
  height: 4em;
  border: 2px solid rgb(69, 68, 72);
  box-shadow: inset 0 0 15px 5px #a6c1f3,
              0 0 40px 1px rgba(56, 97, 93, 0.15);
  border-radius: 4px;
}

.cubo > span:nth-child(1) { transform: rotateY(90deg) translateZ(2em); }
.cubo > span:nth-child(2) { transform: rotateY(90deg) translateZ(-2em); }
.cubo > span:nth-child(3) { transform: rotateY(90deg) translateZ(-2em); }
.cubo > span:nth-child(4) { transform: rotateY(90deg) translateZ(2em); }
.cubo > span:nth-child(5) { transform: translateZ(-2em); }
.cubo > span:nth-child(6) { transform: translateZ(2em); }

.truemaster {
  display: flex;
  align-items: center;
  animation: tratarTexto 3s linear infinite;
  margin-bottom: 20px;
}

.truemaster h1 {
  margin: 0 10px;
  transform: translateZ(2em);
}

@keyframes rotar {
  0%   { transform: rotateY(0deg) rotateX(0deg); }
  50%  { transform: rotateY(45deg) rotateX(45deg); }
  100% { transform: rotateY(0deg) rotateX(0deg); }
}

@keyframes tratarTexto {
  0%   { filter: contrast(1) invert(0); }
  50%  { filter: contrast(50%) invert(0.6); }
  100% { filter: contrast(1) invert(0); }
}

h1, p {
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 100;
  letter-spacing: 2px;
  font-size: 24px;
  max-width: 600px;
}
p{
    margin-top: -10px;
}
</style>

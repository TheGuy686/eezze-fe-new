<template>
  <div class="circle"></div>
</template>

<style lang="postcss">
.circle {
  position: absolute;
  width: 100vw;
  height: 100vw;
  border-radius: 50%;
  border: 12px solid transparent;
  border-top-color: #0091d0;
  animation: spin 24s linear infinite;
  opacity: 0.07;
}

.circle::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  border: 12px solid transparent;
  border-top-color: #00a14b;
  animation: spin 32s linear infinite;
}

.circle::after {
  content: '';
  position: absolute;
  top: 50px;
  left: 50px;
  right: 50px;
  bottom: 50px;
  border-radius: 50%;
  border: 12px solid transparent;
  border-top-color: #f99d1c;
  animation: spin 40s linear infinite;
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
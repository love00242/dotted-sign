<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <h2 class="text-red-500 text-xl">YA</h2>
      <SvgIcon name="test"></SvgIcon>
      <img class="testImg" src="images/test.png" alt="">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  @apply max-h-screen leading-normal;
}
.testImg {
  @apply w-1/2;
}
.wrapper {
  @apply py-10;
}
</style>

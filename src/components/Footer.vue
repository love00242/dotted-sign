<script setup>

</script>

<template>
    <footer class="fixed z-30 bottom-0 right-0 w-full flex shadow-normal h-24 py-5 rounded-md justify-center">
        <div class="flex">
            <div class="box mr-4">
                <SvgIcon name="vector" class="page"></SvgIcon>
                <p>{{ "1 / 2" }}</p>
                <SvgIcon name="vector" class="page rotate-180"></SvgIcon>
            </div>
            <div class="box">
                <SvgIcon name="zoomIn"></SvgIcon>
                <p>{{ "100%" }}</p>
                <SvgIcon name="zoomOut"></SvgIcon>
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
        <button class="btn btn-green px-14 py-3 absolute right-5">完成簽署</button>
    </footer>
</template>

<style scoped>
.box {
    @apply flex justify-around items-center rounded-2xl shadow-normal py-3 w-48;
}
.page {
    @apply rounded-xl bg-green-400 text-white p-2.5;
}
</style>
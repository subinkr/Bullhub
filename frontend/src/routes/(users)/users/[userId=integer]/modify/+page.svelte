<script>
    import {user, hostName} from '$lib/stores.js'
	import { onMount } from 'svelte';
    export let data;

    $user = data.user.data;
    let filename = `${$user.image}`

    onMount(() => {
        const imageWrapper = document.querySelector('.image-wrapper')
        const image = document.querySelector('.image');
        const img = document.querySelector('.temp');
        img.src = filename ? `${$hostName}${filename}` : null;
        image.addEventListener('change', async (e) => {
            const imageData = new FormData(imageWrapper)
            const response = await fetch(`${$hostName}/image`, {
                method: 'post',
                body: imageData
            })
            const result = await response.json();
            if(result.message) {
                location.href = `/users/${$user.id}/modify`
            }
            filename = result.filename;
            img.src = `${$hostName}/public/temp/${filename}`;
        })
    })
</script>

<article class="grid">
    <form action="?/modify" method="post">
        <div class="title">
            <input type='text' name="nickname" bind:value={$user.nickname} />
            <img class="temp" src='' alt="">
            <input type="text" name="image" value={filename} style="opacity: 0; height: 0; cursor: default;">
        </div>
        <form action="?/image" class="image-wrapper" enctype="multipart/form-data">
            <input class="image" name="file" type="file">
        </form>
        <button class="contrast">
            수정하기
        </button>
    </form>
</article>

<style>
    .title {
        text-align: center;
    }
    article {
        margin: 48px 0;
    }
    img {
        width: 80%
    }
</style>
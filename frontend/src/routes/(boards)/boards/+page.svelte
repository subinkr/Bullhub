<script>
    import {onMount} from 'svelte'
    import {user, hostName} from '$lib/stores.js'
    export let data;

    $user = data.user;

    let category = '게시판 선택'
    let filename = null

    onMount(() => {
        const imageWrapper = document.querySelector('.image-wrapper')
        const image = document.querySelector('.image');
        image.addEventListener('change', async (e) => {
            const imageData = new FormData(imageWrapper)
            const response = await fetch(`${$hostName}/image`, {
                method: 'post',
                body: imageData
            })
            const result = await response.json();
            filename = result.filename;
            const img = document.querySelector('.temp');
            img.src = `${$hostName}/public/temp/${filename}`;
        })
    })
</script>

<form action="?/board" method="post">
    <input name="image" type="text" value={filename} style="opacity: 0;">
    <input type="text" name="title" placeholder="제목">
    <textarea name="content" id="" cols="30" rows="10" placeholder="내용"></textarea>
    <details role="list">
        <summary aria-haspopup="listbox">{category}</summary>
        <ul role="listbox">
            {#if $user && $user.role === 'ADMIN'}
                <li><a href={null} on:click={()=> category = '공지사항'}>공지사항</a></li>
            {/if}
          <li><a href={null} on:click={()=> category = '국내주식 게시판'}>국내주식 게시판</a></li>
          <li><a href={null} on:click={()=> category = '해외주식 게시판'}>해외주식 게시판</a></li>
          <li><a href={null} on:click={()=> category = '비트코인 게시판'}>비트코인 게시판</a></li>
        </ul>
      </details>
    <img class="temp" src="" alt="">
    <form action="/" class="image-wrapper" enctype="multipart/form-data">
        <input class="image" name="file" type="file">
    </form>
    <button>작성하기</button>
    <input class="category-value" name="category" type="text" value={category} style="opacity: 0;">
</form>

<style>
    a {
        cursor: pointer;
    }
    form {
        text-align: center;
    }
    details {
        text-align: left;
    }
    img {
        width: 80%;
    }
</style>
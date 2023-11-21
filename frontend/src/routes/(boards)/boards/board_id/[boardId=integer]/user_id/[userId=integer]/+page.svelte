<script>
    import {onMount} from 'svelte'
    import {user, hostName} from '$lib/stores.js'
    export let data;

    const board = data.board.data;
    let {title, content, category, image: imageData} = board
    switch (board.category) {
        case 'ANNOUNCEMENT':
            category = '공지사항'
            break;
        case 'DOMESTIC':
            category = '국내주식 게시판'
            break;
        case 'FOREIGN':
            category = '해외주식 게시판'
            break;
        case 'BITCOIN':
            category = '비트코인 게시판'
            break;
    }
    $user = data.user;

    let filename = null
    
    onMount(() => {
        const imageWrapper = document.querySelector('.image-wrapper')
        const image = document.querySelector('.image');
        const img = document.querySelector('.temp');

        img.src = `${$hostName}${imageData}`
        
        filename = imageData ? imageData.split('/public/boards/')[1] : null

        image.addEventListener('change', async (e) => {
            const imageData = new FormData(imageWrapper)
            const response = await fetch(`${$hostName}/image`, {
                method: 'post',
                body: imageData
            })
            const result = await response.json();
            filename = result.filename;
            img.src = `${$hostName}/public/temp/${filename}`;
        })
    })
</script>

<form action='?/modify' method="post">
    <input name="image" type="text" value={filename} style="opacity: 0;">
    <input class="title" type="text" name="title" placeholder="제목" bind:value={title}>
    <textarea class="content" name="content" id="" cols="30" rows="10" placeholder="내용" bind:value={content}></textarea>
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
    <form action={null} class="image-wrapper" enctype="multipart/form-data">
        <input class="image" name="file" type="file">
    </form>
    <button>작성하기</button>
    <input class="category-value" name="category" type="text" value={category} style="opacity: 0;">
</form>

<style>
    a {
        cursor: pointer;
    }
</style>
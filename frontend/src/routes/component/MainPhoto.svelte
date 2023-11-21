<script>
    import {hostName} from '$lib/stores.js'
    export let board;
    const image = $hostName + board.image
    const titleArr = board.title.split('').slice(0,10)
    if(board.title.length > 10) {
        titleArr.push('...')
    }
    const contentArr = board.content.split('').slice(0,20)
    if(board.content.length > 20) {
        contentArr.push('...')
    }
    const title = titleArr.join('')
    const content = contentArr.join('')
</script>

<a href="/boards/board_id/{board.id}" class="main-photo contrast">
    <article><img src={image} alt=""/></article>
    <div class="photo-background contrast">
        <div class="photo-title">{title}</div>
        <div class="photo-content">{content}</div>
    </div>
</a>

<style>
    article {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    img {
        width: 100%;
    }
    .main-photo {
        border: solid 1px #777;
        margin: 20px;
        height: 200px;
        overflow: hidden;
        position: relative;
    }
    .photo-background {
        width: 100%;
        height: 40%;
        opacity: 0.8;
        background-color: #222;
        position: absolute;
        bottom: 0;
    }
    .photo-title {
        color: #fff;
        font-size: 24px;
        padding: 0 8px;
    }
    .photo-content {
        color: #fff;
        font-size: 16px;
        padding: 0 8px;
    }
</style>
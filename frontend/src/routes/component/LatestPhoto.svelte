<script>
    import {hostName} from '$lib/stores.js'
    export let board;
    const image = $hostName + board.image
    const titleArr = board.title.split('').slice(0,5)
    if(board.title.length >= 5) {
        titleArr.push('...')
    }
    const title = titleArr.join('')
</script>

<a href="/boards/board_id/{board.id}" class="new-photo">
    <article><img src={image} alt="사진"/></article>
    <div class="photo-background">
        <div class="photo-title">{title}</div>
    </div>
</a>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    img {
        object-fit: contain;
    }
    article {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .new-photo {
        border: solid 1px #777;
        margin-bottom: 20px;
        width: 100%;
        height: 64px;
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
        font-size: 12px;
    }
</style>
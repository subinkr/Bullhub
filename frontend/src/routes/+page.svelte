<script>
    import {onMount} from 'svelte'
    import {user} from '$lib/stores.js'
    import AnnounceBoard from './component/AnnounceBoard.svelte'
    import MainPhoto from './component/MainPhoto.svelte'
    import MainBoard from './component/MainBoard.svelte'
    import LatestPhoto from './component/LatestPhoto.svelte'
	import { fly } from 'svelte/transition';

    export let data
    
    const home = data.home
    let index = 0;
    let transition = true;

    $user = home.user

    onMount(async() => {
        setInterval(() => {
            transition = false;
            setTimeout(() => {
                transition = true;
                index = (index + 1) % 5;
            }, 500);
        }, 3000);
    })
</script>

{#if home.data}
<div class="grid">
    {#if home.data.mainPhotos}
    {#each home.data.mainPhotos as board}
        <MainPhoto {board} />
    {/each}
    {/if}
</div>
<h5>공지사항</h5>
{#if transition}
    <article class="announcement" in:fly={{duration:500, y:10}}  out:fly={{duration: 500,y:-10}}>
        <AnnounceBoard board={home.data.announcementLatests[index]} />
    </article>
{/if}

<hr>

<div class="grid">
    <div class="box">
        <h5>국내주식 게시판</h5>
        <nav>
            <ul>
                <li><div>제목</div></li>
                <li><div>추천</div></li>
            </ul>
        </nav>
        <hr>
        {#if home.data.domesticBoardLikes}
        {#each home.data.domesticBoardLikes as board}
        <MainBoard {board} />
        {/each}
        {/if}
    </div>
    
    <div class="box">
        <h5>해외주식 게시판</h5>
        <nav>
            <ul>
                <li><div>제목</div></li>
                <li><div>추천</div></li>
            </ul>
        </nav>
        <hr>
        {#if home.data.foreignBoardLikes}
        {#each home.data.foreignBoardLikes as board}
        <MainBoard {board} />
        {/each}
        {/if}
    </div>
    
    <div class="box">
        <h5>비트코인 게시판</h5>
        <nav>
            <ul>
                <li><div>제목</div></li>
                <li><div>추천</div></li>
            </ul>
        </nav>
        <hr>
        {#if home.data.bitcoinBoardLikes}
        {#each home.data.bitcoinBoardLikes as board}
        <MainBoard {board} />
        {/each}
        {/if}
    </div>
</div>

<hr>

<div class="grid">
    <div class="box">
        <h5>인기글</h5>
        <nav>
            <ul>
                <li><div>제목</div></li>
                <li><div>추천</div></li>
            </ul>
        </nav>
        <hr>
        {#if home.data.boardLikes}
        {#each home.data.boardLikes as board}
        <MainBoard {board} />
        {/each}
        {/if}
    </div>
    
    <div class="box">
        <h5>사진첩</h5>
        {#if home.data.newPhotos}
        <nav>
            <ul class="photo-wrapper">
                {#each home.data.newPhotos.slice(0,2) as board}
                <div class="photo"><LatestPhoto {board}/></div>
                {/each}
            </ul>
        </nav>
        <nav>
            <ul class="photo-wrapper">
                {#each home.data.newPhotos.slice(2,4) as board}
                <div class="photo"><LatestPhoto {board}/></div>
                {/each}
            </ul>
        </nav>
        <nav>
            <ul class="photo-wrapper">
                {#each home.data.newPhotos.slice(4,6) as board}
                <div class="photo"><LatestPhoto {board}/></div>
                {/each}
            </ul>
        </nav>
        {/if}
    </div>

    <div class="box">
        <h5>댓글 많은 글</h5>
        <nav>
            <ul>
                <li><div>제목</div></li>
                <li><div>추천</div></li>
            </ul>
        </nav>
        <hr>
        {#if home.data.boardComments}
        {#each home.data.boardComments as board}
            <MainBoard {board} />
        {/each}
        {/if}
    </div>
</div>
{/if}

<style>
    .announcement {
        padding: 0 24px;
    }
    .grid {
        margin: 32px 0;
    }
    .box {
        padding: 48px;
    }
    .photo-wrapper {
        display: flex;
        gap: 8px;
    }
    .photo {
        flex: 1;
    }
    nav {
        display: flex;
        justify-content: center;
    }
    ul {
        display: flex;
        justify-content: space-between;
        width: 100%
    }
    li {
        padding: 4px 12px;
    }
    h5 {
        text-align: center;
    }
    hr {
        border: solid 1px #ccc;
    }
</style>
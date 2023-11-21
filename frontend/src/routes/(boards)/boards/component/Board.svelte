<script>
	import { onMount } from "svelte";

    export let board;
    export let boardId;
    export let userId;

    $: userImageUrl = board.user.image ? `http://localhost:4000${board.user.image}` : null
    $: boardImageUrl = board.image ? `http://localhost:4000${board.image}` : null

    async function like() {
        const token = document.cookie.split('token=')[1].split(';')[0]

        const response = await fetch(`http://localhost:4000/boards/board_id/${boardId}/user_id/${userId}`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        board.isGood = !board.isGood
    }
    
    async function dislike() {
        const token = document.cookie.split('token=')[1].split(';')[0]

        const response = await fetch(`http://localhost:4000/boards/board_id/${boardId}/user_id/${userId}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        board.isGood = !board.isGood
    }

    onMount(()=>{
        const textarea = document.querySelector('textarea');
        textarea.style.height = textarea.scrollHeight + 'px'
    })
</script>

<article> 
    <hgroup>
        <nav>
            <ul>
                <h1>{board.title}</h1>
            </ul>
            <ul>
            {#if board.isGood}
                <button class="aft-like" on:click={dislike}>
                    <span class="material-symbols-outlined is-good">
                        favorite
                    </span>
                </button>
            {:else}
                <button class='bef-like' on:click={like}>
                    <span class="material-symbols-outlined">
                        favorite
                    </span>
                </button>
            {/if}
            </ul>
        </nav>
        <nav>
            <ul>
                <li><img class="profile-image" src={userImageUrl} alt=""></li>
                <li>{board.user.nickname}님이 작성함</li>
            </ul>
            <ul>
                <li>{board.createdAt.split('T')[0]} {board.createdAt.split('T')[1].split(':').slice(0,2).join(':')}</li>
            </ul>
        </nav>
    </hgroup>
    <hr>    
    <br>
    {#if board.image}
        <figure>
            <img src={boardImageUrl} alt="이미지">
        </figure>
    {/if}
    <textarea readonly>{board.content}</textarea>
</article>

<style>
    textarea {
        border: none;
        overflow: auto;
        outline: none;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        resize: none; /*remove the resize handle on the bottom right*/
    }
    .material-symbols-outlined {
        cursor: pointer;
    }
    .bef-like {
        background-color: #333;
        color: #eee;
        display: flex;
        align-items: center;
        margin: 0;
    }
    .aft-like {
        background-color: hotpink;
        color: #eee;
        display: flex;
        align-items: center;
        margin: 0;
    }
    figure {
        display: flex;
        justify-content: center;
    }
    h1 {
        padding: 0 0.5rem;
        margin: 0;
    }
    img {
        width: 80%;
    }
    .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>
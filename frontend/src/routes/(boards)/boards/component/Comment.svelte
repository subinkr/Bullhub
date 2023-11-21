<script>
    import {user} from '$lib/stores.js'
    export let comment;
    export let boardId;

    $: imageUrl = comment.user.image ? `http://localhost:4000${comment.user.image}` : null
    let modifyComment = false;

    async function modify() {
        let token;
        if(document.cookie) {
            token = document.cookie.split('token=')[1].split(';')[0]
        }

        const response = await fetch(`http://localhost:4000/boards/board_id/${boardId}/comment_id/${comment.id}`, {
            method: 'put',
            headers: {
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({content: comment.content})
        });
        modifyComment = !modifyComment
    }
    async function drop() {
        let token;
        if(document.cookie) {
            token = document.cookie.split('token=')[1].split(';')[0]
        }

        const response = await fetch(`http://localhost:4000/boards/board_id/${boardId}/comment_id/${comment.id}`, {
            method: 'delete',
            headers: {
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        location.href = `/boards/board_id/${boardId}`
    }
</script>

<nav>
    <ul>
        <li><img class="profile-image" src={imageUrl} alt=""></li>
        <li><strong>{comment.user.nickname}</strong></li>
    </ul>
    {#if comment.user.id === $user.id}
        <ul>
            <li><a href={null} class="contrast" on:click={() => modifyComment = !modifyComment}>수정</a></li>
            <li><a href={null} class="contrast" on:click={drop}>삭제</a></li>
        </ul>
    {/if}
</nav>
<nav>
    {#if modifyComment}
    <div class="container comment">
        <input type="text" class="container" bind:value={comment.content}>
        <button on:click={modify}>수정하기</button>
    </div>
    {:else}
    <ul>
        <li><div>{comment.content}</div></li>
    </ul>
    {/if}
    <ul>
    {#if !modifyComment}
        <li><weak>{comment.createdAt.split('T')[0]} {comment.createdAt.split('T')[1].split(':').slice(0,2).join(':')}</weak></li>
    {/if}
    </ul>
</nav>
<hr>

<style>
    weak {
        color: #999
    }
    a {
        cursor: pointer;
    }
    input {
        min-width: 120px;
    }
    button {
        flex: 1;
        min-width: 120px;
    }
    .comment {
        display: flex;
        gap: 16px;
        margin: 0;
    }
    .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>
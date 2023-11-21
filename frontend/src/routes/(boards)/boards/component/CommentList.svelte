<script>
	import Comment from './Comment.svelte'
    export let board;

    let commentValue = null;
    
    async function comment() {
        let token;
        if(document.cookie) {
            token = document.cookie.split('token=')[1].split(';')[0]
        }

        const response = await fetch(`http://localhost:4000/boards/board_id/${board.id}`, {
            method: 'post',
            headers: {
				'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({content: commentValue})
        });

        location.href = `/boards/board_id/${board.id}`
    }
</script>

<article>
    <div class="comment">
        <input type="text" name="content" placeholder="댓글을 입력해주세요" bind:value={commentValue}>
        <button type="submit" on:click={comment}>작성하기</button>
    </div>  
    {#each board.comments as comment}
        <Comment {comment} boardId={board.id} />
    {/each}
</article>

<style>
.comment {
    display: flex;
    gap: 16px;
    margin: 0;
}
input {
    min-width: 120px;
}

button {
    flex: 1;
    min-width: 120px;
}
</style>
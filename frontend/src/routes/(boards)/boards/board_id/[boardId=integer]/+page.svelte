<script>
    import Board from '../../component/Board.svelte'
    import CommentList from '../../component/CommentList.svelte'
    import {page} from '$app/stores';
    import {user, hostName, message} from '$lib/stores.js'

    $user = $page.data.board.user
    const board = $page.data.board.data

    function list() {
        location.href = `/boards/${board.category}/1`
    }

    function modify() {
		location.href = `/boards/board_id/${$page.params.boardId}/user_id/${$user.id}`;
    }

    async function drop() {
        const token = document.cookie.split('token=')[1].split(';')[0]

		const response = await fetch(`${$hostName}/boards/board_id/${$page.params.boardId}`, {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${token}`
			},
		});

        location.href = '/'
    }
</script>

<Board {board} boardId={$page.params.boardId} userId={$user.id}/>   
<nav>
    <ul>
        <li><button class="contrast" on:click={list}>글 목록으로</button></li>
    </ul>
    {#if board.user.id === $user.id}
        <ul>
            <li><button on:click={modify}>수정하기</button></li>
            <li><button on:click={drop}>삭제하기</button></li>
        </ul>
    {/if}
</nav>
<CommentList {board} />

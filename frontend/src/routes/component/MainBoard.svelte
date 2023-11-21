<script>
    export let board;
</script>

<nav>
    <ul>
        <li>
            <a href="/boards/board_id/{board.id}" class="contrast">
            {#if board.title.length > 10}
                {board.title.slice(0,10)}... [{board.commentsCount}]
            {:else}
                {board.title} [{board.commentsCount}]
            {/if}
            </a>
        </li>
        <li>
            {board.likesCount}
        </li>
    </ul>
</nav>

<style>
    * {
        padding: 0;
    }
    li {
        padding: 0 12px;
    }
    nav {
        display: flex;
        justify-content: center;
    }
    ul {
        padding: 4px 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>
<script>
    export let board;
</script>

<nav>
    <ul>
        <li>
            {#if board}
            <a href="/boards/board_id/{board.id}" class="contrast">
                {board.title} [{board.commentsCount}]
            </a>
            {/if}
        </li>
    </ul>
</nav>
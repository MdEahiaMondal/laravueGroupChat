<template>
    <div id="chat">
        <li class="list-group-item" :class="className">
            <slot></slot>
            <span id="time" class="badge badge-dark">{{ time }}</span>
        </li>
        <br>
        <br>
        <small class="badge" :class="badgeColor">{{ user }}</small>
    </div>

</template>

<script>
    export default {
        props: ['color', 'user', 'float', 'time'],
        computed: {
          className()
          {
              return 'list-group-item-'+this.color +' '+this.float;
          },
            badgeColor()
            {
                return 'badge-success'+' '+this.float;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

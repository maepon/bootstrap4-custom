import Bootstrap from 'bootstrap'

function main(){
  $('body').append('test').append('<div class="alert">ALERT!</div>')
  setTimeout(()=>{
    $('.alert').alert('close')
  },1000)
}


main()
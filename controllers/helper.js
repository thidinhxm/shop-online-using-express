const helper = {}

helper.newId = (name) => String(name).toLowerCase().split(' ').join('-')

helper.createStarList = (stars) => {
    const str = `<ul class="list">
    <li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
             class="fa fa-star"></i><i class="fa fa-star"></i>${stars[4]}</a></li>
    <li><a href="#">4 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
             class="fa fa-star"></i><i class="fa fa-star disabled"></i>${stars[3]}</a></li>
    <li><a href="#">3 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
             class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i>${stars[2]}</a></li>
    <li><a href="#">2 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i
             class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i>${stars[1]}</a></li>
    <li><a href="#">1 Star <i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i
             class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i>${stars[0]}</a></li>
</ul>`
    return str
}

helper.createStars = (star) => {
    return '<i class="fa fa-star"></i>'.repeat(star) + '<i class="fa fa-star disabled"></i>'.repeat(5 - star)
}
module.exports = helper
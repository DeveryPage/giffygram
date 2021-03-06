export const NavBar = () => {
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
              <button id="home_button"><img id="home_image" src="./images/pb.png" alt="Giffygram icon" /></button>
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            <div class="navigation__item navigation__search">
                <input type="text" id="postSearch" placeholder="Search posts..." />
            </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="./images/fountain-pen.svg" alt="Direct message" />
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
    `
}



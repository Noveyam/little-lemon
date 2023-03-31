import React from "react";

function Header() {
    return (
        <head>
            <title>Litte Lemon</title>
            <meta name="author" content="Novey"/>
            <meta name="title" content="Little Lemon"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="description" content="Come visit Little Lemon Restaurant"/>
            <meta name="keywords" content="Little Lemon, Restaurant"/>
            <meta name="format-detection" content="telephone=yes"/>
            <meta name="HandheldFriendly" content="true"/>
            <meta name="revised" content="Wednesday, March 29th, 2023, 03:38 PM"/>
            {/*Below is the Open Graphic Protocal*/}
            <meta property="og:title" content="Little Lemon Restaurant" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://littlelemon.com" />
            <meta property="og:image" content="./images/logo.png" />
            <meta property="description" content="Come visit Little Lemon Restaurant"/>
            <meta property="og:locale" content="en_US" />
            <style>@import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400;700&display=swap');</style>
            <style>@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');</style>
        </head>
    );
}

export default Header;
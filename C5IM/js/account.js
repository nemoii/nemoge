if (window.location.search == "")
{
    window.location.href="http://www.nemoge.com/";
}

title = document.getElementsByTagName("title")[0];
wrapper = document.getElementById("wrapper");
if(getQueryStringValue("login"))
{
    title.innerText = "��¼��C5IM";
    wrapper.innerHTML = "\
    <div id=\"formCaption\">��¼��C5IM</div>\
    <div class=\"loginBox\">\
    <img class=\"profile-img\" src=\"avatar_2x.png\" alt=\"\">\
        <form>\
            <table class=\"center\" id=\"signupTable\">\
                <tr>\
                    <td><label for=\"username\">�û���</label></td>\
                    <td><input type=\"text\" name=\"username\" id=\"username\" maxlength=\"12\"/></td>\
                </tr>\
                <tr>\
                    <td><label for=\"password\">��&nbsp;&nbsp;&nbsp;&nbsp;��</label></td>\
                    <td><input type=\"password\" name=\"password\" id=\"password\" maxlength=\"20\" /></td>\
                </tr>\
                <tr>\
                    <td colspan=\"2\"><input type=\"submit\" value=\"�� ¼\" id=\"submit\" class=\"form-button\" /></td>\
                </tr>\
            </table>\
        </form>\
    </div>";
    document.getElementById("username").focus();
}
else if(getQueryStringValue("signup"))
{
    title.innerText = "��������C5IM�˺�";
    wrapper.innerHTML = "\
    <div id=\"formCaption\">��������C5IM�˺�</div>\
    <div class=\"signupBox\">\
        <form>\
            <table class=\"center\" id=\"signupTable\">\
                <tr>\
                    <td><label for=\"username\">�û���</label></td>\
                    <td><input type=\"text\" name=\"username\" id=\"username\" maxlength=\"12\"/></td>\
                </tr>\
                <tr>\
                    <td><label for=\"password\">��&nbsp;&nbsp;&nbsp;&nbsp;��</label></td>\
                    <td><input type=\"password\" name=\"password\" id=\"password\" maxlength=\"20\" /></td>\
                </tr>\
                <tr>\
                    <td><label for=\"nickname\">��&nbsp;&nbsp;&nbsp;&nbsp;��</label></td>\
                    <td><input type=\"text\" name=\"nickname\" id=\"nickname\" maxlength=\"12\" /></td>\
                </tr>\
                <tr>\
                    <td colspan=\"2\"><input type=\"submit\" value=\"ע ��\" id=\"submit\" class=\"form-button\" /></td>\
                </tr>\
            </table>\
        </form>\
    </div>";
    document.getElementById("username").focus();
}
else
{
    window.location.href="http://www.nemoge.com/";
}

function getQueryStringArgs()
{
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

        args = {},

        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,

        i = 0,
        len = items.length;

    for(i = 0; i < len;i++)
    {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length)
        {
            args[name] = value;
        }
    }

    return args;
}

function getQueryStringValue(name)
{
    return getQueryStringArgs()[name];
}
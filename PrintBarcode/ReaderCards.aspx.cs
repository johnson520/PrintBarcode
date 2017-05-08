using System;
using System.Text;
using System.Web;
using System.Web.UI;

namespace PrintBarcode
{
    public partial class ReaderCards : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var sb = new StringBuilder();

            var random = new Random();

            for (var i = 0; i < 8; ++i)
            {
                var x = i % 2 == 0 ? 0.5 : 4.5;
                var row = i / 2;
                var y = 0.75 + row * 2.5;

                var ReaderName = HttpUtility.HtmlEncode("MattyJ");
                var Role = i % 3 == 0 ? "Librarian" : "Reader";
                var LibraryName = HttpUtility.HtmlEncode("Bereba");

                var s = "";

                var check = 0;

                for (var j = 0; j < 6; ++j)
                {
                    var d = (int)Math.Ceiling(random.NextDouble() * 9);
                    s += d.ToString();
                    check += d;
                }
                s += (check % 10).ToString();

                var ReaderBarcode = HttpUtility.HtmlEncode(s);

                sb.AppendLine($@"<div class='card' style='top: {y:0.00}in; left: {x:0.00}in;'><table><tr><td>
                        <h1>{ReaderName}</h1>
                        <h2>{Role}</h2>
                        <h3>{LibraryName}</h3>
                    </td></tr></table><div class='barcode'><svg data-barcode='{
                        ReaderBarcode
                    }' xmlns='http://www.w3.org/2000/svg' version='1.1'></svg></div></div>");
            }

            insertCards.InnerHtml = sb.ToString();
        }
    }
}
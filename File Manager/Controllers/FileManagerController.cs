using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO.Compression;
using Rashvin.FileManager;

namespace File_Manager.Controllers
{    
    public class FilemanagerController : Controller
    {
        [HttpGet]
        [Route("")]
        public ViewResult FileManager()
        {
            Config.SetStartupPath("F:\\");
            return View();
        }
        [HttpGet]
        [Route("FileManager/GetFiles")]
        public ViewResult GetFiles(string Path)
        {
           
            ViewBag.L = "<div class='row'>";
            string ps = Path;

            Path = Config.StartupPath + Path;
            foreach (string dir in Directory.GetDirectories(Path))
            {
                ViewBag.L += "<div class='mmm col-lg-1' style='width:80px;text-align:center'><a class='FileFolder' href='#' onclick='return false;' data-path='" + dir.Replace(Config.StartupPath, "") + "'><img src='/FileManager/img/Folder.ico' /><br /><div style='height:25px;text-align:center;overflow:hidden;width:80px;height:22px'>" + dir.Substring(dir.LastIndexOf("\\") + 1) +
                    "</div></a></div>";

            }
            foreach (string file in Directory.GetFiles(Path))
            {
                string strEx = "File.ico";
                int n = file.LastIndexOf(".");
                string stre = "";
                if (n > -1)
                {
                    stre = file.ToString().Substring(n + 1).ToLower();
                }
                switch (stre)
                {
                    case "jpg":
                    case "bmp":
                    case "jpeg":
                    case "png":
                    case "gif":
                    case "jpe":
                    case "ico":
                        strEx = "bmp.ico";
                        break;
                    case "mp4":
                    case "3gp":
                    case "avi":
                    case "mpg":
                    case "mpeg":
                        strEx = "video.ico";
                        break;
                    case "mp3":
                    case "m4a":
                    case "wav":
                    case "wma":
                        strEx = "ac3.ico";
                        break;
                    case "doc":
                    case "docx":
                        strEx = "docx.ico";
                        break;
                    case "zip":
                    case "rar":
                        strEx = "rar.ico";
                        break;
                    case "pps":
                    case "ppt":
                    case "pptx":
                        strEx = "pps.ico";
                        break;
                    case "rtf":
                        strEx = "rtf.ico";
                        break;
                    case "txt":
                        strEx = "txt.ico";
                        break;
                    case "pdf":
                        strEx = "pdf.ico";
                        break;
                    default:
                        if (System.IO.File.Exists(Server.MapPath("~/FileManager/Img/" + stre + ".png")))
                        {
                            strEx = stre + ".png";
                        }
                        break;
                }

                ViewBag.L += "<div class='flcl col-lg-1' style='width:80px;text-align:center'><a class='FileFolder' href='http://" + Request.Url.Host + "/FileManager/Download?Path=" + file.Replace(Config.StartupPath, "") + "' data-path='" + file.Replace(Config.StartupPath, "") + "' onclick='return false;'><img src='/FileManager/img/" + strEx + "' height='50' /><br /><div style='margin-left:5px;text-align:center;overflow:hidden;width:60px;height:22px'>" + file.Substring(file.LastIndexOf("\\") + 1) +
                                        "</div></a></div>";


            }

            ViewBag.l += "</div>";
            return View();
        }
        [HttpPost]
        [Route("FileManager/PasteFile")]
        public string PasteFile(string[] OriginalPath, string NewPath, int Type, bool[] FileType)
        {
            string strRet = "ok";
            for (int i = 0; i < OriginalPath.Length; i++)
            {
                string file = OriginalPath[i];
                try
                {
                    file = file.Substring(file.LastIndexOf("\\") + 1);
                }
                catch
                {

                }

                if (FileType[i] == false)
                {
                    if (Type == 1)
                    {
                        System.IO.File.Move(Config.StartupPath + OriginalPath[i], Config.StartupPath + NewPath + "\\" + file);
                    }
                    else
                    {
                        System.IO.File.Copy(Config.StartupPath + OriginalPath[i], Config.StartupPath + NewPath + "\\" + file, true);
                    }
                }
                else
                {
                    if (Type == 1)
                    {
                        Directory.Move(Config.StartupPath + OriginalPath[i], Config.StartupPath + NewPath + "\\" + file);
                    }
                    else
                    {
                        Actions.DirectoryCopy(Config.StartupPath + OriginalPath[i], Config.StartupPath + NewPath + "\\" + file, true);
                    }
                }


            }
            return strRet;
        }
        [HttpPost]
        [Route("FileManager/RenameFile")]
        public string RenameFile(string Path, string OriginalFile, string NewName)
        {
            string strRet = "ok";
            System.IO.File.Move(Config.StartupPath + Path + "\\" + OriginalFile, Config.StartupPath + Path + "\\" + NewName);

            return strRet;
        }
        [HttpPost]
        [Route("FileManager/DeleteFile")]
        public string DeleteFile(string[] Path, bool[] FileType)
        {
            string strRet = "ok";
            for (int i = 0; i < Path.Length; i++)
            {
                if (FileType[i] == false)
                {
                    System.IO.File.Delete(Config.StartupPath + Path[i]);
                }
                else
                {
                    Directory.Delete(Config.StartupPath + Path[i], true);
                }
            }

            return strRet;
        }
        [HttpPost]
        [Route("FileManager/DeleteFolder")]
        public string DeleteFolder(string[] Path)
        {
            string strRet = "ok";
            Directory.Delete(Config.StartupPath + Path, true);

            return strRet;
        }

        [HttpPost]
        [Route("FileManager/Upload")]
        public string Upload(string Path, HttpPostedFileBase File)
        {
            string strRet = "ok";
            File.SaveAs(Config.StartupPath + Path + "\\" + File.FileName);

            return strRet;
        }
        [HttpPost]
        [Route("FileManager/RenameFolder")]
        public string RenameFolder(string Path, string OriginalFile, string NewName)
        {
            string strRet = "ok";
            Directory.Move(Config.StartupPath + Path + "\\" + OriginalFile, Config.StartupPath + Path + "\\" + NewName);

            return strRet;
        }
        [HttpPost]
        [Route("FileManager/ExtractZip")]
        public string ExtractZip(string Path)
        {
            string strret = "ok";
            string p = (Config.StartupPath + Path);
            p = p.Substring(0, p.LastIndexOf("\\"));
            ZipFile.ExtractToDirectory(Config.StartupPath + Path, p);
            return strret;
        }
        [HttpPost]
        [Route("FileManager/Zip")]
        public string Zip(string Path, string Name, string[] Files, bool[] FileType)
        {
            string strret = "ok";
            var zip = ZipFile.Open(Config.StartupPath + Path + Name + ".zip", ZipArchiveMode.Create);
            for (int i = 0; i < Files.Length; i++)
            {
                if (FileType[i] == false)
                {
                    try
                    {
                        Files[i] = Files[i].Substring(Files[i].LastIndexOf("\\") + 1);
                    }
                    catch { }
                    zip.CreateEntryFromFile(Config.StartupPath + Files[i], Files[i]);
                }
                else
                {

                    foreach (string p in Directory.GetFiles(Config.StartupPath + Files[i], "*.*", SearchOption.AllDirectories))
                    {
                        string tmp = "";
                        try
                        {
                            tmp = p.Replace(Config.StartupPath + "\\", "");
                        }
                        catch { }
                        zip.CreateEntryFromFile(p, tmp);
                    }
                }
            }
            zip.Dispose();
            return strret;
        }
        [HttpGet]
        [Route("FileManager/Download")]
        public ActionResult Download(string Path)
        {
            string filename = Path;
            try
            {
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);
            }
            catch { }
            return File(Config.StartupPath + Path, "application/octet-stream", filename);
        }
        [HttpPost]
        [Route("FileManager/CreateFolder")]
        public string CreateFolder(string Path, string Name)
        {
            Directory.CreateDirectory(Config.StartupPath + Path + "\\" + Name);
            return "ok";
        }
    }
}
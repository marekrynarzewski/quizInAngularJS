<?php
/**
 * Description of AutoScripterAndStyler
 *
 * @author Marek
 */
class AutoScripterAndStyler 
{
    private $scripts = array();
    private $styles = array();
    
    public function AutoScripterAndStyler($scripts = array(), $styles = array())
    {
        $this->scripts = $scripts;
        $this->styles = $styles;
    }
    
    public function run()
    {
        $result = '';
        $result .= $this->attachScripts();
        $result .= $this->attachStyles();
        return $result;
    }
    
    private function attachScripts()
    {
        $result = '';
        $template = '<script src=[URL] type="text/javascript"></script>';
        foreach ($this->scripts as $url)
        {
            $urls = $this->scandir($url);
            $result .= $this->appliesToTemplate($urls, $template);
        }
        return $result;
    }
    
    private function attachStyles()
    {
        $result = '';
        $template = '<link rel="stylesheet" href=[URL] type="text/css" />';
        foreach ($this->styles as $url)
        {
            $urls = $this->scandir($url);
            $result .= $this->appliesToTemplate($urls, $template);
        }
        return $result;
    }
    
    private function scandir($path)
    {
        $temp = scandir($path);
        $results = array();
        foreach ($temp as $file)
        {
            $warunek1 = !in_array($file, array('.', '..'));
            $warunek2 = is_file($path.'/'.$file);
            $ext = pathinfo($file, PATHINFO_EXTENSION);
			$warunek3 = in_array($ext, array('js', 'css'));
            $warunki = $warunek1 && $warunek2 && $warunek3;
            if ($warunki)
            {
                array_push($results, $path.'/'.$file);
            }
        }
        usort($results, array($this, 'sortzx'));
        return $results;
    }
    private function sortzx($a,$b)
    {
        return strlen($a)-strlen($b);
    }
    
    private function appliesToTemplate(array $items, $template)
    {
        $result = '';
        foreach ($items as $item)
        {
            $result .= $this->applyToTemplate($item, $template);
        }
        return $result;
    }
    
    private function applyToTemplate($item, $template)
    {
        $result = str_replace('[URL]', '"'.addslashes($item).'"', $template)."\n";
        return $result;
    }
}

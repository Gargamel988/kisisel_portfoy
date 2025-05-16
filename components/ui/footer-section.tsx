"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Instagram, Linkedin, Moon, Sun } from "lucide-react";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative bg-background text-foreground transition-colors duration-300 ">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-around gap-6 sm:gap-10 md:gap-12 lg:justify-around  ">
          <div className="ml-0 md:ml-6 mb-6 sm:mb-8 md:mb-0 flex flex-col items-center sm:items-center md:items-start ">
            <h3 className="mb-4 text-base sm:text-lg md:text-xl font-semibold">
              iletisim
            </h3>
            <address className="space-y-2 text-sm sm:text-base md:text-lg not-italic">
              <a href="tel:+905537319288">telefon: 553 731 9288</a>
              <br />
              <a href="mailto:gargamel9288@gmail.com">
                Email: gargamel9288@gmail.com
              </a>
            </address>
          </div>
          <div className="relative mr-0 md:mr-6 flex flex-col items-center sm:items-center md:items-start ">
            <h3 className="mb-4 text-base sm:text-lg md:text-xl font-semibold">
              takip et
            </h3>
            <div className="mb-6 flex justify-center sm:justify-center md:justify-start space-x-4 ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://github.com/Gargamel988"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Github className="h-4 w-4" />
                        <span className="sr-only">Github</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Github görüntüle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.instagram.com/omeraydin9826/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>instagram&apos;dan takip et</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip >
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/in/%C3%B6mer-ayd%C4%B1n-3bb453366/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-4"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer "
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>linkedin&apos;da takip et</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 Ömer Aydın. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { PortfolioItem, ModalItem } from "./client/modern-portfolio-carousel";
import Image from "next/image";
import Link from "next/link";

interface ModalContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: PortfolioItem;
}

export default function ModalContent({
  open,
  onOpenChange,
  item,
}: ModalContentProps) {
  const modalItem: ModalItem | undefined = item?.modalItems?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="overflow-y-auto max-h-[80vh] overflow-x-hidden w-full max-w-[calc(100vw-2rem)]">
        {modalItem ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl">
                {modalItem.title}
              </DialogTitle>
              <DialogDescription className="text-base md:text-lg">
                {modalItem.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              {modalItem.image && modalItem.image !== "" && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-white/20">
                  <Image
                    src={modalItem.image}
                    alt={modalItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kategori</h3>
                  <span className="inline-block px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-sm font-medium">
                    {modalItem.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Süre</h3>
                    <p className="text-gray-300">{modalItem.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Rol</h3>
                    <p className="text-gray-300">{modalItem.role}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ekip</h3>
                    <p className="text-gray-300">{modalItem.team}</p>
                  </div>
                </div>

                {modalItem.technologies &&
                  modalItem.technologies.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Teknolojiler
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {modalItem.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-md text-gray-300 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {modalItem.libraries && modalItem.libraries.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Kütüphaneler</h3>
                    <div className="flex flex-wrap gap-2">
                      {modalItem.libraries.map((lib, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-md text-gray-300 text-sm"
                        >
                          {lib}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {modalItem.features && modalItem.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Özellikler</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {modalItem.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {modalItem.link && (
                  <div className="pt-4">
                    <Link
                      href={modalItem.link}
                      target="_blank"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                    >
                      Projeyi İncele
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <DialogHeader>
            <DialogTitle>Yükleniyor...</DialogTitle>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}

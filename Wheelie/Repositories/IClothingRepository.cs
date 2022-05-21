using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IClothingRepository
    {
        List<Clothing> GetAllClothing();
        void AddClothing(Clothing clothing);
        void UpdateClothing(Clothing clothing);
        void DeleteClothing(Clothing clothing);
        Clothing GetClothingById(int id);
    }
}

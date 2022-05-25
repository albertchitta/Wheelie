using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IHelmetRepository
    {
        List<Helmet> GetAllHelmets();
        Helmet GetHelmetById(int id);
        void AddHelmet(Helmet helmet);
        void UpdateHelmet(Helmet helmet);
        void DeleteHelmet(int id);
    }
}

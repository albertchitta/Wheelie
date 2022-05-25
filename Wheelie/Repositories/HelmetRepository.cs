using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class HelmetRepository : IHelmetRepository
    {
        private readonly IConfiguration _config;

        public HelmetRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection
                    (_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Helmet> GetAllHelmets()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Brand,
                                               Color
                                        FROM Helmet";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Helmet> helmets = new List<Helmet>();
                    while (reader.Read())
                    {
                        Helmet helmet = new Helmet
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Brand = reader.GetString(reader.GetOrdinal("Brand")),
                            Color = reader.GetString(reader.GetOrdinal("Color"))
                        };

                        helmets.Add(helmet);
                    }

                    reader.Close();

                    Console.WriteLine(helmets);
                    return helmets;
                }
            }
        }

        public Helmet GetHelmetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Brand,
                                               Color
                                        FROM Helmet
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Helmet helmet = new Helmet
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Brand = reader.GetString(reader.GetOrdinal("Brand")),
                            Color = reader.GetString(reader.GetOrdinal("Color"))
                        };

                        reader.Close();
                        return helmet;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddHelmet(Helmet helmet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Helmet (Brand,
                                                            Color)
                                        OUTPUT INSERTED.ID
                                        VALUES (@brand, @color);";

                    cmd.Parameters.AddWithValue("@brand", helmet.Brand);
                    cmd.Parameters.AddWithValue("@color", helmet.Color);

                    int id = (int)cmd.ExecuteScalar();

                    helmet.Id = id;
                }
            }
        }

        public void UpdateHelmet(Helmet helmet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Helmet
                                        SET Brand = @brand,
                                            Color = @color
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", helmet.Id);
                    cmd.Parameters.AddWithValue("@brand", helmet.Brand);
                    cmd.Parameters.AddWithValue("@color", helmet.Color);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteHelmet(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Helmet
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
